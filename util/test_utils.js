'use strict';

const config = require('../knexfile')['test'];
const knex = require('knex')(config);

module.exports = {
  knex: knex,
  rollback: function(done) {
    knex.migrate.rollback().then(() => {
      knex.migrate.latest().then(() => {
        return knex.seed.run().then(() => {
          done();
        });
      });
    });
  },
  defaultLocation: 'Garnet',
  getRegistrationParams: function(obj) {
    return [
      'email=' + obj.email,
      'vemail=' + (obj.vemail || obj.email),
      'password=' + obj.password,
      'vpassword=' + (obj.vpassword || obj.password),
      'firstname=' + obj.firstName,
      'lastname=' + obj.lastName
    ].join('&');
  },
  users: {
    testUser: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@gmail.com',
      password: 'test'
    },
    adminUser: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@gmail.com',
      password: 'admin'
    },
    newUser: {
      firstName: 'Test2',
      lastName: 'User2',
      email: 'test2@gmail.com',
      password: 'test2'
    },
    driverUser: {
      firstName: 'Immortan',
      lastName: 'Joe',
      email: 'imjoe@gmail.com',
      password: 'test'
    },
    badPassUser: {
      firstName: 'Test3',
      lastName: 'User3',
      email: 'test3@gmail.com',
      password: 'testtest1234!',
      vpassword: 'asdf'
    },
    badEmailUser: {
      firstName: 'Test4',
      lastName: 'User4',
      email: 'test4@gmail.com',
      vemail: 'fasdf@gmail.com',
      password: 'test'
    }
  }
}
