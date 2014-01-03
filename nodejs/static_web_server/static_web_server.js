/**
* static_web_server.js
* classic sample of static web browser using html module
* refactored or reshaped for better understanding.
* YOU MUST create a public_html folder where this script resides.
* @author Pello Xabier Altadill Izura
* @greetz to \"'any'\" ;)
*/

var httpServer = require('http');
var FILESYSTEM = require('fs');
var PATHMODULE = require('path');


/**
* MyWebServer
* a class to represent a web server
*/
var MyWebServer = function (port, serverpath) {
	// this reference comes in handy in cases like this*
	var self = this;
	
	this.port = port;             // web server port
	this.serverpath = serverpath; // public folder
	this.http = httpServer;       // instance of http server
	this.path = PATHMODULE;    // instance of path module
	this.filesystem = FILESYSTEM; // instance of fs module
	this.server = null;
	this.logger = null;
	this.default = 'index.html';

	/**
	* We will call this method to initialize the server
	*
	*/
	this.init = function (logger) {
		this.logger = logger;

		// Instead of putting all code inside createServer...
		this.server = this.http.createServer().listen(this.port);
		// we set a handler function on request event.
		this.server.on('request', this.handleRequest);
		
		this.logger.log('MyWebServer > initialized');
	};

	/**
	* now we handle requests in an isolated method
	* I think is more readable...
	*/
	this.handleRequest = function (request, response) {
				// We have to use 'self' because inside this method 'this' refers to
				// instance of httpserver
				pathname = self.serverpath + request.url;
				self.logger.log("Request:" + pathname);

				// Very easy. File exists? handleOK, if not, handle 404
				self.path.exists(pathname, function(exists) {
					if (!exists) {
						self.handleBadRequest(response);
					} else {
						self.handleOk(response);
					}
				});

			};

	/**
	* handleOK is called when the request is valid
	* it opens the file as a stream and connects to response
	*/
	this.handleOk = function (response) {
				self.logger.log("200:" + pathname);
				response.setHeader('Content-Type', 'text/html');
				
				// We set status code to 200 status, file is found, no errors
				response.statusCode = 200;

				// We open the file and serve it as a stream
				var file = self.filesystem.createReadStream(pathname);
				
				file.on("open", function() {
					file.pipe(response);
				});


				file.on("error", function(err) {
					self.handleInternalServerError(response);
				});
			};

	/**
	* in case of bad request we send a 404 response 
	*/
	this.handleBadRequest = function (response) {
				self.logger.log("404: BAD Request:" + pathname);
				response.writeHead(404);
				response.write('Bad request 404\n');
				response.end();
			};

	/**
	* In case of server error we send back a 500 response
	*/
	this.handleInternalServerError = function (response) {
				self.logger.log("500: Internal server error:");
				response.writeHead(500);
				response.write('Internal server error 500\n');
				response.end();
			};
};

/**
* MyCoolLogger
* just a simple class to have more verbose log messages with useless info
*/
var MyCoolLogger = function (prefix,showdate) {
		this.prefix = prefix;
		this.date = (showdate != null)?showdate:false;

		this.log = function (msg) {
			datestring = (this.date)?"["+Date()+"]":"";
			console.log(prefix + datestring + "> " + msg);
		}
};

var PORT = 8666;
var PATH = '/root/nodejs/static_web_server/public_html';

var logger = new MyCoolLogger('http_server',true);
var server = new MyWebServer(PORT, PATH);

server.init(logger);

logger.log('Server initialized on port:' + PORT);