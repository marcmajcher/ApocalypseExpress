'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);
const bcrypt = require('bcrypt-as-promised');

const titles = {
  index: 'Apocalypse eXpress',
  register: 'ApoX: Register',
  login: 'ApoX: Login'
}

function renderTemplate(req, res, page, flash) {
  res.render('template', {session: req.session, page: page, title: titles[page], flash: flash});
}

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
  renderTemplate(req, res, 'index');
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
    renderTemplate(req, res, 'register');
  }
});

/* Log in/out */
router.get('/login', (req, res) => {
  renderTemplate(req, res, 'login');
})

router.post('/login', (req, res, next) => {
  knex('users').where({email: req.body.email}).first().then((user) => {
    if (!user) {
      renderTemplate(req, res, 'login', 'No email address provided.');
    }
    bcrypt.compare(req.body.password, user.hashed_password)
      .then(() => {
        req.session.user = user;
        delete req.session.hashed_password;
        res.redirect('/');
      })
      .catch(bcrypt.MISMATCH_ERROR, (err) => {
        renderTemplate(req, res, 'login', 'Bad password.');
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
