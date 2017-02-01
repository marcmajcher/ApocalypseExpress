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

const app = express();
app.disable('x-powered-by');

const server = http.createServer(app);

const io = require('socket.io')(server);
app.use((req, res, next) => {
  res.io = io;
  next();
});

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
app.use(session({
  keys: randomKeys
}));

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
app.use('/admin', require('./routes/admin'));
app.use('/driver', require('./routes/driver'));
app.use('/game', require('./routes/game'));
app.use('/location', require('./routes/location'));
app.use('/map', require('./routes/map'));
app.use('/trip', require('./routes/trip'));
app.use('/user', require('./routes/user'));

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
