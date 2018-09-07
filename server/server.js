const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const http = require('http');
const socketIO = require('socket.io');
var app = express();
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection',(socket) =>{
    console.log('New user connected');
    socket.on('disconnect',() =>{
        console.log('Disconnected from client');
    });
    //goi thong tin den client
    // socket.emit('newMessage',{
    //     to: "tri@abc.local",
    //     text: "Okie, what do you want now "
    // });
    //Admin sent message to everyone
    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime(),
    });
    //admin sent message if peopeo joined
    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text:'New user joined',
        createdAt: new Date().getTime()
    });
    //nhan thong tin tu client
    socket.on('createmessage', (message) =>{
        console.log('Create message',message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        }); 
    } );
});
server.listen(port, () =>{
    console.log(`Server is up with ${port}`);
});