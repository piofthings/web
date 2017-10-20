import * as nconf from 'nconf';
import { Configuration } from "./server/services/settings/config-model";
import { Config } from "./server/services/settings/config";
import * as express from "express";
import * as multer from "multer";
import * as pug from "pug";
var Poet = require("poet");
import { GitFetcher } from "./server/services/git-fetcher/git-fetcher";
import { GitListener } from "./server/services/git-listener/git-listener";

var favicon = require('serve-favicon');
var session = require('express-session');
var bodyParser = require('body-parser');

var fs = require('fs');
var http = require('http');
var https = require('https');
var configService = new Config();

export class web {
    private app: express.Application = express();

    constructor() {
        try {
            configService.load((config: Configuration) => {
                this.app.use(bodyParser.json());
                this.app.use(bodyParser.urlencoded({ extended: false }));

                var poet = Poet(this.app, {
                    postsPerPage: 3,
                    posts: __dirname + '/_blog',
                    metaFormat: 'json',
                    routes: {
                        '/blog/:post': 'post',
                        '/blog/:page': 'page',
                        '/tags/:tag': 'tag',
                        '/categories/:category': 'category'
                    }
                });

                poet.init((err: any, cb: any) => {
                    console.log("Err" + JSON.stringify(err));
                }).then(
                    (data: any, cb: any) => {
                        console.log("Initialized");
                        let posts = poet.helper.getPosts(0, 5);
                        console.log(JSON.stringify(posts, null, 1))
                    });

                this.app.set('view engine', 'pug');
                this.app.set('views', __dirname + '/views');
                this.app.get('/blog', (req, res) => {
                    res.render('index');
                });
                this.app.get('/pages', (req, res) => {
                    res.render('index');
                });

                this.app.get('/categories', (req, res) => {
                    res.render('index');
                });

                this.app.get('/rss', (req, res) => {
                    // Only get the latest posts
                    var posts = poet.helpers.getPosts(0, 20);
                    res.setHeader('Content-Type', 'application/rss+xml');
                    res.render('rss', { posts: posts });
                });

                poet.addRoute('/rss/tag/:bytag', (req: any, res: any) => {
                    var tagPosts = poet.helpers.postsWithTag(req.params.bytag);
                    if (tagPosts.length) {
                        res.render('rss', {
                            posts: tagPosts,
                            tag: req.params.bytag
                        });
                    }
                });

                this.app.get('/tags', (req, res) => {
                    res.render('index');
                });
                this.app.use('/.well-known', express.static(__dirname + '/www/.well-known')); //static route for Letsncrypt validation
                this.app.use(express.static(__dirname + '/www')); // All static stuff from /app/wwww

                this.setupWebHook(config, this.app);
                // catch 404 and forward to error handler



                var pkg = require('./package.json');
                var httpServer = http.createServer(this.app);
                httpServer.listen(3005, (): void => {
                    console.log(pkg.name, 'listening on port ', httpServer.address().port);
                });
            });
        }
        catch (err) {
            "Outer catch:" + console.error(err);
        }
    }

    private setupWebHook = (config: Configuration, app: express.Application) => {
        let gitFetcher = new GitFetcher(config.hookconfig);

        this.app.post(config.hookconfig.route, new GitListener(config.hookconfig, gitFetcher.handleHookEvent).serverHandler)

    }
}

var piofthings = new web();
