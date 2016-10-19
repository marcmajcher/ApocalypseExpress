'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);

/* GET home page. */
router.get('/', adminRequired, function(req, res, next) {
  renderTemplate(req, res, 'index');
});

module.exports = router;

/////

/* authorization middleware */
function adminRequired (req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  }
  else {
    res.redirect('/');
  }
};

const titles = {
  index: 'ApoX Admin'
}

function renderTemplate(req, res, page, flash) {
  res.render('_template', {session: req.session, page: page, title: titles[page], flash: flash});
}
