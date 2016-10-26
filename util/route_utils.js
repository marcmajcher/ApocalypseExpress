'use strict';

const config = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);

module.exports = {
  knex: knex,
  titles: {
    index: 'Apocalypse eXpress',
    register: 'ApoX: Register',
    login: 'ApoX: Login',
    account: 'ApoX: User Account'
  },
  defaultLocation: 'Austin',
  renderTemplate: function(req, res, page, params) {
    var obj = Object.assign({session: req.session, user: req.session.user,
                             page: page, title: this.titles[page]},
                            params);
    res.render('_template', obj);
  },
  loginRequired: function(req, res, next) {
    if (req.session.user) {
      next();
    }
    else {
      req.flash('Create an account or log in to access this page.');
      res.redirect('/');
    }
  }

}
