'use strict';

/* eslint-env node */

const socketio = require('socket.io');
const sessions = {};

const driverSocket = driverid => sessions[driverid];
const driverEmitter = driverid => ({
  socket: sessions[driverid],
  emit(eventName, message) {
    if (this.socket) {
      this.socket.emit(eventName, message);
    }
  }
});

const expressMiddleware = (server, session) => {
  const io = socketio(server);

  io.use((socket, next) => {
    session(socket.request, socket.request.res, next);
  });

  io.on('connection', (socket) => {
    const driverid = socket.request.session.user.driverid;
    sessions[driverid] = socket;

    socket.on('disconnect', () => {
      delete sessions[driverid];
    });
  });

  return (req, res, next) => {
    res.io = io;
    next();
  };
};

module.exports = {
  expressSocket: expressMiddleware,
  driverSocket,
  driverEmitter
};
