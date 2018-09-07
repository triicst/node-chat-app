var socket = io();
socket.on('connect',function () {
    console.log('Connected to server');
});
socket.on('disconnect',function () {
    console.log('Disconnected from server');
});
socket.on('newEmail', function (email) {
    console.log('New email',email);
});
socket.on('newMessage', function (message) {
    console.log('New Message',message);
} );
// socket.emit('createmessage',{
//     from:"teo@abc.com",
//     text: "What do you do",
//     createdAt:12
// });