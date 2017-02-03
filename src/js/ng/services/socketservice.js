(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const socketService = function socketService() {
    const socket = io();

    return {
      init: () => {
        socket.on('message', (data) => {
          console.log(data); // eslint-disable-line no-console
        });
        socket.on('disconnect', (data) => {
          console.log('DISCONNECTED:', data);
          socket.io.reconnection(false);
        });
      },
      on: (eventName, callback) => {
        socket.on(eventName, callback);
      }
    };
  };

  angular.module('apox').factory('SocketService', ['$http', socketService]);
})();
