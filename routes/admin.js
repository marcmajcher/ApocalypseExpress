'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);

/* GET home page. */
router.get('/', adminRequired, (req, res, next) => {
  renderTemplate(req, res, 'admin/index');
});

// router.get('/map', adminRequired, (req, res, next) => {
router.get('/map', (req, res, next) => {
  renderTemplate(req, res, 'admin/map');
})


module.exports = router;

/////

/* authorization middleware */
function adminRequired (req, res, next) {
  if (process.env.NODE_ENV === 'development' ||
      req.session.user && req.session.user.role === 'admin') {
    next();
  }
  else {
    res.redirect('/');
  }
};

const titles = {
  'admin/index': 'ApoX Admin',
  'admin/map': 'ApoX Map Admin'
}

function renderTemplate(req, res, page, flash) {
  res.render('_template', {session: req.session, page: page, title: titles[page], flash: flash});
}
