/**
* httpserver.js
* simple web server from O'Reilly Learning Node, Chp 6.
*/
var http = require('http'), 
	path = require('path'),
	fs = require('fs'),

_base = '/home/examples/public_html';

http.createServer(function (req, res) {
	pathname = _base + req.url;
	console.log(pathname);

	path.exists(pathname, function(exists) {
		if (!exists) {
			res.writeHead(404);
			res.write('Bad request 404\n');
			res.end();
		} else {
			res.setHeader('Content-Type', 'text/html');
			// 200 status - found, no errors
			res.statusCode = 200;
			// create and pipe readable stream
			var file = fs.createReadStream(pathname);
	
			file.on("open", function() {
				file.pipe(res);
			});
	
			file.on("error", function(err) {
				console.log(err);
			});
		}
	});
}).listen(8124);

console.log('Server running at 8124/');
