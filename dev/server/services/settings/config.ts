import { Configuration } from "./config-model";
import nconf = require('nconf');
import fs = require('fs');

export class Config {

    public currentSettings = new Configuration();

    constructor() {
    }

    public load(callback: (currentSettings: Configuration) => void = null): void {
        try {
            nconf.file('./webconfig.json');
            nconf.load((data) => {
                try {
                    this.currentSettings.key = nconf.get('key');
                    this.currentSettings.cert = nconf.get('cert');
                    this.currentSettings.showDrafts = nconf.get('showDrafts')
                    this.currentSettings.showFuture = nconf.get('showFuture')
                    this.currentSettings.hookconfig = nconf.get('hookconfig');
                    if (callback != null) {
                        callback(this.currentSettings);
                    }
                }
                catch (error) {
                    console.log("Error loading config, please checked if `webconfig.json` exists in the `dev` folder!");
                }
            });
        }
        catch (error) {
            console.log("Error loading config, please checked if `webconfig.json` exists in the `dev` folder!");
        }
    }

    public set(name: string, value: any): void {
        nconf.set(name, value);
        (<any>this.currentSettings)[name] = <any>value;
    }

    public get(): Configuration {
        return this.currentSettings;
    }

    public saveSettings(settings: Configuration): void {
        let keys: Array<string> = Object.keys(<any>settings);
        keys.forEach((key: any) => {
            nconf.set(key, (<any>settings)[key]);
        });
        this.save();
    }

    public save(): void {
        nconf.save((err: any) => {
            fs.readFile('./config.json', (err, data) => {
                console.dir(JSON.parse(data.toString()))
            });
        });
    }
}
