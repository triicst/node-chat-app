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
jQuery('#form-message').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createmessage',{
        from:'User',
        text: jQuery('[name=message]').val()
    }, function (){

    });
});
var locationButton = jQuery('#send-location'); 
locationButton.on('click', function (){
    if(!navigator.geolocation){
        return alert('Geolocation not support by your brosswer');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch locations');
    });
});