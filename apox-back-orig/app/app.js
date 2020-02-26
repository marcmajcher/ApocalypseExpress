'use strict';

/* eslint-env node */

require('dotenv').load();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const session = require('cookie-session');
const randomstring = require('randomstring');
const methodOverride = require('method-override');
const http = require('http');
const ticker = require('./ticker');
const socket = require('./socket');

const app = express();
const server = http.createServer(app);
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.use(methodOverride('_method'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

const numKeys = Math.ceil(Math.random() * 10) + 10; // eslint-disable-line no-magic-numbers
const randomKeys = [];
for (let i = 0; i < numKeys; i++) {
  randomKeys.push(randomstring.generate());
}
const sessionMiddleware = session({
  keys: randomKeys
});
app.use(sessionMiddleware);
app.use(socket.expressSocket(server, sessionMiddleware));

/* flash messages */
app.use((req, res, next) => {
  const messages = req.session.messages || (req.session.messages = []);
  res.locals.messages = req.session.messages;
  req.flash = (message, type) => {
    messages.push({
      message,
      type: type || 'alert'
    });
  };
  next();
});

// TODO: CSRF?

app.use('/', require('./routes/index'));
['admin', 'driver', 'game', 'location', 'map', 'trade', 'trip', 'user', 'vehicle'].forEach((e) => {
  app.use(`/${e}`, require(`./routes/${e}`)); // eslint-disable-line global-require
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/* Set up intervals for all the things */
if (app.get('env') !== 'test') {
  ticker.start();
}

module.exports = {
  app,
  server
};
