'use strict';

/* eslint-env node */

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const randomstring = require('randomstring');
const methodOverride = require('method-override');

const routes = require('./routes/index');
const user = require('./routes/user');
const admin = require('./routes/admin');
const mapRoutes = require('./routes/map');
const game = require('./routes/game');

const app = express();
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

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
/* eslint-disable no-param-reassign */
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

app.use('/', routes);
app.use('/user', user);
app.use('/admin', admin);
app.use('/map', mapRoutes);
app.use('/game', game);

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


module.exports = app;
