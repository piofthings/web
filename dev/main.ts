import * as nconf from 'nconf';
import { Configuration } from "./server/services/settings/config-model";
import { Config } from "./server/services/settings/config";
import * as express from "express";
import * as multer from "multer";
import * as pug from "pug";
var Poet = require("poet");

var favicon = require('serve-favicon');
var session = require('express-session');
var bodyParser = require('body-parser');

var fs = require('fs');
var app: express.Application = express();
var http = require('http');
var https = require('https');
var configService = new Config();

try {
    configService.load((config: Configuration) => {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        var poet = Poet(app, {
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

        poet.init((err: any, cb: any)=>{
            console.log("Err" + JSON.stringify(err));
        }).then(
            (data: any, cb: any) => {
            console.log("Initialized");
            let posts = poet.helper.getPosts(0,5);
            console.log(JSON.stringify(posts, null, 1))
        });

        app.set('view engine', 'pug');
        app.set('views', __dirname + '/views');
        app.get('/blog', (req, res) => {
            res.render('index');
        });
        app.get('/pages', (req, res) => {
            res.render('index');
        });
        app.get('/tags', (req, res) => {
            res.render('index');
        });
        app.get('/categories', (req, res) => {
            res.render('index');
        });

        app.get('/rss', function (req, res) {
          // Only get the latest posts
          var posts = poet.helpers.getPosts(0, 5);
          res.setHeader('Content-Type', 'application/rss+xml');
          res.render('rss', { posts: posts });
        });
        
        app.use('/.well-known', express.static(__dirname + '/www/.well-known')); //static route for Letsncrypt validation
        app.use(express.static(__dirname + '/www')); // All static stuff from /app/wwww

        // catch 404 and forward to error handler



        var pkg = require('./package.json');
        var httpServer = http.createServer(app);
        httpServer.listen(3002, (): void => {
            console.log(pkg.name, 'listening on port ', httpServer.address().port);
        });
    });
}
catch (err) {
    "Outer catch:" + console.error(err);
}
