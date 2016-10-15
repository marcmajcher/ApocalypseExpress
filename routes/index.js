'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised');

const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config);

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
  res.render('index', { title: 'Apocalypse Express', session: req.session });
});

router.get('/booyah', (req, res) => {
  res.send('booyah');
});


/* User registration page */
router.get('/register', (req, res, next) => {
  // if they're not logged in, show the registration page
  res.render('register');
  // otherwise, send them to the home page
});

/* Create new user */
router.post('/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
    .then((hashed_password) => {
      return knex('users')
        .insert({
          email: req.body.email,
          hashed_password: hashed_password
        }, '*');
    })
    .then((users) => {
      const user = users[0];
      delete user.hashed_password;
      res.redirect('login');
    })
    .catch((err) => {
      next(err);
    });
});

/* Log in/out */
router.get('/login', (req, res) => {
  res.render('login', {flash: ''});
})

router.post('/login', (req, res, next) => {
  knex('users').where({email: req.body.email}).first().then((user) => {
    if (!user) {
      res.render('login', {flash: 'no email'});
    }
    bcrypt.compare(req.body.password, user.hashed_password)
      .then(() => {
        req.session.user = user;
        delete req.session.hashed_password;
        res.redirect('/');
      })
      .catch(bcrypt.MISMATCH_ERROR, (err) => {
        res.render('login', {flash: 'bad pass'});
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
