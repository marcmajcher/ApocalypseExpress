(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const socketService = function socketService() {
    const socket = io();
    socket.on('apoxmsg', function(msg) {
      console.log('Message for you:', msg);
    });

    return {

    };
  };

  angular.module('apox').factory('SocketService', ['$http', socketService]);
})();
