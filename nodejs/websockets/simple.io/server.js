var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8666);

function handler (req, res) {
  // We send back the client interface
  // with socket.io dynamic library
  fs.readFile(__dirname + '/websockets.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading websockets.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

/**
* onConnection controller.
* we set a kind of event depending on emit parameters.
* when client send emit('event666') the handler will be socket.on('event666')
*/
io.sockets.on('connection', function (socket) {
  
  socket.on('myname', function (data) {
    console.log('Received from client:' + data.name);
    socket.emit('fromserver', { msg: 'ok, hello ' + data.name });
  });

  socket.on('fromclient', function (data) {
    console.log('Received from client:' + data);
      socket.emit('fromserver', { msg: 'ok, message received: ' + data.msg });
  });

});