'use strict';

/* eslint-env node */

module.exports = (server) => {
  const io = require('socket.io')(server);


  io.on('connection', (socket) => {

    function getCallback() {
      let count = 0;
      return (socket) => {
        const msg = socket.id + ' ' + count++;
        io.sockets.connected[socket.id].emit('message', msg);
      };
    }

    const interval = setInterval(getCallback(), 1000, socket);
    socket.on('disconnect', () => {
      clearInterval(interval);
    });
  });


  return (req, res, next) => {
    res.io = io;
    next();
  };

}
