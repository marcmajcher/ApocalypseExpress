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
  res.render('index', { title: 'Apocalypse Express', session: req.session });
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
    res.render('register');
  }
});

/* Create new user */
router.post('/register', (req, res, next) => {
  if (req.body.email && req.body.vemail &&
      req.body.password && req.body.vpassword &&
      req.body.firstname && req.body.lastname) {
    if (req.body.password !== req.body.vpassword) {
      var err = new Error('Passwords do not match')
      err.status = 500;
      next(err);
    }
    else if (req.body.email !== req.body.vemail) {
      var err = new Error('Emails do not match')
      err.status = 500;
      next(err);
    }
    else {
      bcrypt.hash(req.body.password, 12)
        .then((hashed_password) => {
          return knex('users')
            .insert({
              email: req.body.email,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              screenname: generateScreenName(),
              hashed_password: hashed_password
            }, '*');
        })
        .then((users) => {
          const user = users[0];
          delete user.hashed_password;
          res.redirect('/');
        })
        .catch((err) => {
          next(err);
        });
      }
    }
    else {
      var err = new Error('Registration missing required fields')
      err.status = 500;
      next(err);
    }
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



function generateScreenName() {
  return 'Random Screen Name';
}

module.exports = router;
