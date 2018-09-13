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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#message').append(html);
    // console.log('New Message',message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    //jQuery('#message').append(li);
} );
socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    jQuery.append(html);
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
  
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
  });
jQuery('#form-message').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createmessage',{
        from:'User',
        text: jQuery('[name=message]').val()
    }, function (){
        jQuery('[name=message]').val('');
    });
});
var locationButton = jQuery('#send-location'); 
locationButton.on('click', function (){
    if(!navigator.geolocation){
        return alert('Geolocation not support by your brosswer');
    }
    locationButton.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch locations');
    });
});