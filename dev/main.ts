/// <reference path="./typings/index.d.ts"/>

import nconf = require('nconf');
import { Configuration } from "./server/services/settings/config-model";
import { Config } from "./server/services/settings/config";
import * as express from "express";
//import { Container } from "./server/di/container";
//import { CrossRouter } from "./server/services/routing/cross-router";

// var express = require('express');
var multer = require('multer');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var app: express.Application = express();
var http = require('http');
var https = require('https');
var configService = new Config();

try {
    configService.load((config: Configuration) => {
        // let credentials = {
        //     key: fs.readFileSync(__dirname + config.key, 'utf8'),
        //     cert: fs.readFileSync(__dirname + config.cert, 'utf8')
        // };
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        // Register routes
        app.use(express.static(__dirname + '/www/')); // All static stuff from /app/wwww

        // catch 404 and forward to error handler
        app.use(function(req: Express.Request, res: Express.Response, next: any) {
            var err = new Error('Not Found');
            err.message = "404";
            next(err);
        });

        // error handlers
        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use((err: any, req: express.Request, res: express.Response, next: any) => {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        app.use((err: any, req: express.Request, res: express.Response, next: any) => {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });

        var pkg = require('./package.json');
        var httpServer = http.createServer(app);
        // var httpsServer = https.createServer(credentials, app);
        httpServer.listen(3002, (): void => {
            console.log(pkg.name, 'listening on port ', httpServer.address().port);
        });
        // httpsServer.listen(3445, (): void => {
        //     console.log(pkg.name, 'listening on port ', httpsServer.address().port);
        // });
    });
}
catch (err) {
    console.error(err);

}
