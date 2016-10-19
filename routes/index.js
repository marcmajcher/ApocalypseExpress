'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);
const bcrypt = require('bcrypt-as-promised');

/* authorization middleware */
function loginRequired (req, res, next) {
  if (req.session.user) {
    next();
  }
  else {
    res.redirect('/');
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { session: req.session, page: 'index' });
});

router.get('/booyah', (req, res) => {
  res.send('booyah');
});


/* User registration page */
router.get('/register', (req, res, next) => {
  if (req.session.user) {
    res.redirect('/');
  }
  else {
    res.render('register', {session: req.session, page: 'register'});
  }
});

/* Log in/out */
router.get('/login', (req, res) => {
  res.render('login', {flash: '', session: req.session, page: 'login'});
})

router.post('/login', (req, res, next) => {
  knex('users').where({email: req.body.email}).first().then((user) => {
    if (!user) {
      res.render('login', {flash: 'no email', session: req.session, page: 'login'});
    }
    bcrypt.compare(req.body.password, user.hashed_password)
      .then(() => {
        req.session.user = user;
        delete req.session.hashed_password;
        res.redirect('/');
      })
      .catch(bcrypt.MISMATCH_ERROR, (err) => {
        res.render('login', {flash: 'bad pass', session: req.session, page: 'login'});
      })
      .catch((err) => {
        next(err);
      })
  });
});

router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});


module.exports = router;
