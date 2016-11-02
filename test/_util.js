'use strict';

/* eslint-env mocha, node */

const config = require('../knexfile').test;
const knex = require('knex')(config);

module.exports = {
  knex,
  rollback: (done) => {
      knex.migrate.rollback().then(() => {
        knex.migrate.latest().then(() =>
          knex.seed.run().then(() => {
            done();
          })
        );
      });
    },
    defaultLocation: 'Garnet',
    getRegistrationParams: obj => [
      `email=${obj.email}`,
      `vemail=${(obj.vemail || obj.email)}`,
      `password=${obj.password}`,
      `vpassword=${(obj.vpassword || obj.password)}`,
      `firstname=${obj.firstName}`,
      `lastname=${obj.lastName}`
    ].join('&'),
    getCookie: res =>
    res.headers['set-cookie'].map(r =>
      r.replace('; path=/; httponly', ''))
    .join('; '),
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
};
