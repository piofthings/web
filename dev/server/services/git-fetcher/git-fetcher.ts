import * as fs from 'fs';
import * as https from 'https';

var octonode = require('octonode');

export class GitFetcher {

    private repo: any;
    private hookConfig: HookConfig;

    constructor(config: HookConfig) {
        this.hookConfig = config;
    }

    public handleHookEvent = (event: any, repo: any, ref: any, data: any) => {
        try {
            console.log(JSON.stringify(event, null, 2));
            console.log(JSON.stringify(repo, null, 2));
            console.log(JSON.stringify(data.repository, null, 2));

            var fullNameRepository = data.repository.full_name;

            for (let i = 0; i < this.hookConfig.actions.length; i++) {
                let repoConfig = this.hookConfig.actions[i];
                if (repoConfig.eventName == event) {
                    this.fetchFromGitHub(this.hookConfig.accessToken, data.repository.full_name, repoConfig, (buffer: any) => {
                        console.log("Action complete for Event:" + event);
                    });
                }
            }

        }
        catch (ex) {
            console.log("ERROR:" + ex.message);
        }
    }

    public fetchFromGitHub = (gitHubAccessToken: string,
        repoFullName: string,
        repoConfig: RepoConfig,
        callback: any) => {

        let client = octonode.client(gitHubAccessToken);
        if (client != null) {
            this.repo = client.repo(repoFullName);
            console.log("Trying to get: " + repoFullName + " @filePath: " + repoConfig.fetchPath);
            try {
                this.getFolder(repoConfig.fetchPath, repoConfig, () => {

                });
            }
            catch (err) {
                console.log(err.message);
            }
        }
    }

    private getFolder = (filePath: string, repoConfig: RepoConfig, callback: any) => {

        this.repo.contents(filePath, "", (err: any, result: Array<any>) => {
            if (err) {
                console.log("ERROR:" + err.message);

                callback(null);
            }
            else {
                try {
                    console.log("Result Length:" + result.length);
                    for (let i = 0; i < result.length; i++) {
                        let file = result[i];
                        if (file.type == "file") {
                            this.saveFile(file, repoConfig);
                        }
                        else {
                            if (file.type == "dir") {
                                let targetPath = file.path.replace(repoConfig.fetchPath, repoConfig.basePath)
                                //let targetPath = require('path').dirname(targetFile);
                                console.log(`Target Folder: ${targetPath}`);

                                this.ensureExists(targetPath, 511, repoConfig, () => {
                                    this.getFolder(file.path, repoConfig, callback);
                                });
                            }
                        }
                    }
                    callback(null);
                }
                catch (err) {
                    console.log(err.message);

                }
            }
        });
    }

    private saveFile = (file: any, repoConfig: RepoConfig) => {
        let request = https.get(file.download_url, (response: any) => {
            try {
                console.log(file.path);
                let targetFile = file.path.replace(repoConfig.fetchPath, repoConfig.basePath)
                let targetPath = require('path').dirname(targetFile);
                console.log(`File: ${file.name} at ${targetFile}`);
                this.ensureExists(targetPath, 511, repoConfig, () => {
                    let newFile = fs.createWriteStream(targetFile);
                    response.pipe(newFile);
                });
            }
            catch (err) {
                console.log("SaveFile Error: " + err.message);
            }
        });
    }

    private ensureExists = (path: string, mask: number, repoConfig:RepoConfig, cb: any) => {
        if (typeof mask == 'function') { // allow the `mask` parameter to be optional
            cb = mask;
            mask = 511;
        }
        let controlledPaths = new Array<string>();
        let paths = path.split(
            '/' // Put each path in an array
        ).filter(
            p => p != '.' // Skip root path indicator (.)
            ).reduce((memo, item) => {
                //console.log("Reduce: memo:" + memo + " item: " + item);
                // Previous item prepended to each item so we preserve realpaths
                const prevItem = memo.length > 0 ? memo[memo.length - 1] + "/" : '';

                controlledPaths.push(prevItem + item);
                return [...memo, prevItem + item];
            }, []).map(dir => {
                //console.log("MAP: " + dir);
                try {
                    fs.mkdirSync(dir);
                }
                catch (error) {
                    if (error && error.code != 'EEXIST'){
                        console.log("BROKEN");
                        console.error(error);
                        throw error;
                    }
                    //console.error("Exists: Skipped");
                }
                controlledPaths.splice(controlledPaths.indexOf(dir), 1)
                if (controlledPaths.length == 0) {
                    //console.log("Calling back");
                    return cb();
                }
            });
    }
}
