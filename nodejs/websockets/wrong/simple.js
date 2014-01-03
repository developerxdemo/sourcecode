#!/bin/env node
//  OpenShift sample Node application
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

app.listen(8666);

function handler (req, res) {
	console.log('something received');
	fs.readFile(__dirname + '/websockets.html',
	function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading chat.html');
		}
		console.log('something received: ' + data);
		res.writeHead(200);
		res.end(data);
		//res.end(JSON.stringify({data: 'ok, received: ' + data }));
	});
}

io.sockets.on('connection', function (socket) {
	socket.on('addme',function(username) {
		console.log('addme received');
		socket.username = username;
		socket.emit('chat', 'SERVER', 'You have connected');
		socket.broadcast.emit('chat', 'SERVER', username + ' is on deck');
	});

	socket.on('chat', function(data) {
		console.log('chat received');
		io.sockets.emit('chat', socket.username, data);
	});

	socket.on('sendchat', function(data) {
		console.log('chat received');
		io.sockets.emit('chat', socket.username, data);
	});

	socket.on('disconnect', function() {
		io.sockets.emit('chat', 'SERVER', socket.username + ' has left the building');
	});

});
