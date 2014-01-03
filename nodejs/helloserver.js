/**
* Hello server using express module
* It will respond to an event when it receives '/hello' request
* To test just run this with
* linux# node helloserver.js
* And see from a browser http://localhost:8666/hello
* @author Pello Xabier Altadill Izura
*/
var express = require('express');
var myserver = express();
var port = 8666;  // By demon be driven

var MyServer = function () {
	self = this;

	self.init=
    
    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };

 

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send('Say hello');
        };
    };

        /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express.createServer();

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };

       /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
    	        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        //  Start the app on the specific interface (and port).
        self.app.listen(80, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};




/**
 *  main():  Main code.
 */
var zapp = new MyServer();
zapp.initialize();
zapp.start();