/**
* quote server
* Mixing express and mongoose
* @author Pello Xabier Altadill Izura
*/
// Web server creation
var express = require('express');
var myserver = express();
var port = 8666;  // By demon be driven

// Run the server...
myserver.listen(port);
console.log('Listening on port ' + port);

// Database access
var mongoose = require('mongoose');
// connection
mongoose.connect('mongodb://localhost/quotesdb');

// Must define this once
var quotesSchema = new mongoose.Schema({ content: 'string', author: 'string' });
var quotes = mongoose.model('quotes', quotesSchema);

// event: when the servers receives a GET /quote
myserver.get('/quote', function(req, res){

	// We select the first record....
 	 quotes.findOne(function (err, quote) {
  			// And we serve...
			res.send(quote.content)
		});

});

