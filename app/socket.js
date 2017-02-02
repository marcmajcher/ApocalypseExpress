'use strict';

/* eslint-env node */

const cookie = require('cookie');
const socketio = require('socket.io');
const sessions = {};

const socketSession = (sessionid) => {
  return sessions[sessionid];
};

const expressMiddleware = (server, session) => {
  const io = socketio(server);

  io.use((socket, next) => {
    session(socket.request, socket.request.res, next);
  });

  io.on('connection', (socket) => {
    const sessionid = cookie.parse(socket.request.headers.cookie).session;
    sessions[sessionid] = socket;

    function getCallback() {
      let count = 0;
      return (cbSocket) => {
        const msg = cbSocket.id + ' ' + count++;
        io.sockets.connected[cbSocket.id].emit('message', msg);
      };
    }

    const interval = setInterval(getCallback(), 1000, socket);

    socket.on('disconnect', () => {
      clearInterval(interval);
      delete sessions[sessionid];
    });
  });

  return (req, res, next) => {
    res.io = io;
    next();
  };
};

module.exports = {
  expressSocket: expressMiddleware,
  socketSession
};
