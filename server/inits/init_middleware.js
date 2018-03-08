'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const errorhandler = require('errorhandler');

module.exports = function (app) {

  app.use(morgan('dev'));
  app.use(compression());
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(cookieParser());
  app.use(session({
    secret: 'Bug CCCatcher',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: require('./init_db').mongoose.connection}),
    rolling: true,
    cookie: {
      maxAge: 36000000 //加了个0,1小时 变 10个小时
    }
  }));

  // if (app.get('env') !== 'product') {
  //   app.use(require('connect-livereload')());
  //   app.use(errorhandler());
  // }

  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With,Content-Length,Authorization,Accept,Cookie,Cache-Control,Pragma,expire-day");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
  });
  app.use('/', express.static(path.join(__dirname, '../public')));
  app.use('/catcher.js', express.static(path.join(__dirname, '../catcher/bug_catcher.js')));
  app.use('/server.md', express.static(path.join(__dirname, '../server.md')));

}