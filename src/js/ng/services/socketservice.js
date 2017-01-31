(() => {
  'use strict';

  /* eslint-env jquery, browser */

  // const socketService = function socketService() {
  //   const socket = io();
  //   socket.on('apoxmsg', function(msg) {
  //     console.log('Message for you:', msg);
  //   });
  //
  //   return {
  //
  //   };
  // };
  //
  // angular.module('apox').factory('SocketService', ['$http', socketService]);
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
