// 'use strict';
//
// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
//
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
//
// io.on('connection', (socket) => {
//   let prefix = '>';
//
//   socket.on('chat', (msg) => {
//     prefix = msg;
//   });
//
//   const interval = setInterval(getCallback(), 1000, socket);
//
//   socket.on('disconnect', () => {
//     clearInterval(interval);
//   });
// });
//
// http.listen(3000, () => {
//   console.log('listening on *:3000');
// });
//
// function getCallback() {
//   let count = 0;
//   return (socket) => {
//     console.log(count);
//     socket.emit('chat', count++);
//   };
// }
