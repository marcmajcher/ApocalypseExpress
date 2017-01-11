'use strict';

/* eslint-env node */

const config = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);
const nameList = require('./data/uniquenames');

module.exports = {
  knex,
  titles: {
    index: 'Apocalypse eXpress',
    register: 'ApoX: Register',
    login: 'ApoX: Login',
    account: 'ApoX: User Account',
    'admin/index': 'ApoX Admin',
    'admin/map': 'ApoX Map Admin',
    game: 'Apocalypse eXpress - Main'
  },
  defaultLocation: 'Austin',
  renderTemplate(req, res, page, params) {
    const obj = Object.assign({
        session: req.session,
        user: req.session.user,
        page,
        title: this.titles[page]
      },
      params);
    res.render('_template', obj);
  },
  loginRequired: (req, res, next) => {
    if (req.session.user) {
      next();
    }
    else {
      req.flash('Create an account or log in to access this page.');
      res.redirect('/');
    }
  },
  adminRequired: (req, res, next) => {
    if ((process.env.NODE_ENV === 'development') ||
      (req.session.user && req.session.user.role === 'admin')) {
      next();
    }
    else {
      const err = new Error('You are not admin');
      err.status = 500;
      next(err);
    }
  },
  generateApocName: () => {
    const n1 = nameList[Math.floor(Math.random() * nameList.length)];
    const n2 = nameList[Math.floor(Math.random() * nameList.length)];
    return `${n1} ${n2}`;
  },
  logError: (error, wat) => {
    console.log(`Error: ${wat}`); // eslint-disable-line
    console.log(error); // eslint-disable-line
  }
};
