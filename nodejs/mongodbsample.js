/**
* Access to mongodb database
* using mongoose module. It's weird but:
* "programmers need to define consistent access patterns in their own programs."
* @author Pello Xabier Altadill Izura
* picking a random record seems to be a tricky issue, and a feature request is pending yet:
* https://jira.mongodb.org/browse/SERVER-533
*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotesdb');

console.log('Let\'s connect');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Here comes the weird thing -for me-.
// to query mongodb you've to define the Schema you expect.
var quotesSchema = new mongoose.Schema({ content: 'string', author: 'string' });
var quotes = mongoose.model('quotes', quotesSchema);

// Once we are connected we can query the database
db.once('open', function callback () {
  console.log('Ok, we are connected');

  // Here we can behave like a mongo client.
  // so we execute a find on every record {}, showing all fields {}
  // and with a callback function to show results.
  quotes.find({},{},function (err, allquotes) {
  	//if (err) // TODO handle err
  	allquotes.forEach(function (q) {
				  	console.log(q.content)
  				});
	});
});