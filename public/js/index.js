var socket = io();
socket.on('connect',function () {
    console.log('Connected to server');
});
socket.on('disconnect',function () {
    console.log('Disconnected from server');
});
// socket.on('newEmail', function (email) {
//     console.log('New email',email);
// });
socket.on('newMessage', function (message) {
    console.log('New Message',message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#message').append(li);
} );
// socket.emit('createmessage',{
//     from:"teo@abc.com",
//     text: "What do you do",
//     createdAt:12
// });
// socket.emit('createmessage',{
//     from:'Tri Pham',
//     text: 'Hi !'
// }, function (data) {
//     console.log('Got it',data);
// });
jQuery('#form-message').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createmessage',{
        from:'User',
        text: jQuery('[name=message]').val()
    }, function (){

    });
});