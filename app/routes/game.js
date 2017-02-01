'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('../_util');

router.use(util.loginRequired);

router.get('/', (req, res) => {
  const user = req.session.user;
  if (user) {
    util.renderTemplate(req, res, 'game');

    res.io.on('connection', (socket) => {
      console.log(req.session.user.firstname, 'CONNECTING');
      socket.on('join', (data) => {
        console.log(req.session.user.firstname, 'JOINING ROOM', data.room);
        socket.join(data.room);

        function getCallback() {
          let count = 0;
          return (socket) => {
            const msg = req.session.user.firstname + ' ' + socket.id + ' ' + count++;
            // res.io.sockets.in(data.room).send(msg);
          };
        }

        const interval = setInterval(getCallback(), 1000, socket);
        socket.on('disconnect', () => {
          console.log('DICSONNSET');
          clearInterval(interval);
        });
      });
    });

  }
  else {
    res.redirect('index');
  }
});

module.exports = router;;

module.exports = router;
