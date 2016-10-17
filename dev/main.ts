/// <reference path="./typings/index.d.ts"/>

import nconf = require('nconf');
import { Configuration } from "./server/services/settings/config-model";
import { Config } from "./server/services/settings/config";
import * as express from "express";

var multer = require('multer');
var favicon = require('serve-favicon');
var logger = require('morgan');
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

        // Register routes
        app.use('/.well-known', express.static(__dirname + '/www/.well-known')); //static route for Letsncrypt validation
        app.use(express.static(__dirname + '/www')); // All static stuff from /app/wwww

        // catch 404 and forward to error handler
        app.use(function(req: Express.Request, res: Express.Response, next: any) {
            var err = new Error('Not Found');
            err.message = "404";
            next(err.message + ": Unhandled Error");
        });

        // error handlers
        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use((err: any, req: express.Request, res: express.Response, next: any) => {
                res.status(err.status || 500);
                next(err.status || 500 + ": Unhandled Error" + err.message);
            });
        }

        // production error handler
        // no stacktraces leaked to user
        app.use((err: any, req: express.Request, res: express.Response, next: any) => {
            res.status(err.status || 500);
            next(err.status || 500 + ": Unhandled Error");
        });

        var pkg = require('./package.json');
        var httpServer = http.createServer(app);
        // var httpsServer = https.createServer(credentials, app);
        httpServer.listen(3002, (): void => {
            console.log(pkg.name, 'listening on port ', httpServer.address().port);
        });
    });
}
catch (err) {
    "Outer catch:" + console.error(err);
}
