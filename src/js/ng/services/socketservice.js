(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const socketService = function socketService() {
    const socket = io('//localhost:3000');

    return {
      init: () => {
        socket.on('message', (data) => {
          console.log(data); // eslint-disable-line no-console
        });
      },
      on: (eventName, callback) => {
        socket.on(eventName, callback);
      }
    };
  };

  angular.module('apox').factory('SocketService', ['$http', socketService]);
})();

//
// app.factory('socket', function($rootScope){
//   var socket = io.connect();
//   return {
//     on: function(eventName, callback) {
//       socket.on(eventName, function() {
//         var args = arguments;
//         $rootScope.$apply(function() {
//           callback.apply(socket, args);
//         });
//       });
//     },
//     emit: function(eventName, data, callback) {
//       socket.emit(eventName, data, function() {
//         var args = arguments;
//         $rootScope.$apply(function() {
//           if(callback) {
//             callback.apply(socket, args);
//           }
//         });
//       });
//     }
//   };
// });
