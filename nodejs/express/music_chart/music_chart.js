
/**
 * music_chart.js server
 * Based on http and express modules.
 * The purpose is to manage a list of songs located in a MongoDB database,
 * providing REST resources.
 * To test it try with http://localhost:3000/rest.html
 *
 * @author Pello Xabier Altadill Izura
 * @greetz For those interested in localStorage and such...
 */

// Requires modules
var express = require('express');
var http = require('http');
var path = require('path'); 

// my configuration
var config = require('./config'); 

var routes = require('./routes');

var songRoutes = require('./routes/song');

// We add some color to our logs...
var logger = require('./lib/coloredlog');
logger.setOpt('MusicChartSvr',true,false);

songRoutes.setLogger(logger);
// Just in case we don't like default colors
// logger.setColors('red','green','grey','rainbow');

// We set Model class for songs, passing our config
var songModel = require('./models/song');
mySongModel = new songModel.songModel(config.config);

songRoutes.setSongModel(mySongModel);


var app = express();


app.configure(function() {

	// We set express options
	// Server port
	app.set('port', process.env.PORT || 3000);
	// The views directory
	app.set('views', __dirname + '/views');
	// The template engine, jade based
	app.set('view engine', 'jade');

	// We will use some express facilities, for static content
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	// This allow to emulate RESTful queries through a hidden _method param
	// in forms (for PUT and DELETE).
	app.use(express.methodOverride());
	// This will enable our REST routes
	app.use(app.router);

	// Static content
	app.use(express.static(path.join(__dirname, 'public')));

	// Any other will be considered not found so:
	app.use(function(req, res, next){
		logger.logwarn(' 404 Resource not found: ' + req.url);
		res.send('Sorry ' + req.url + ' does not exist');
	});

});

/**
* By default node considers that it's in a development environment.
* To change environment set this var in shell:
* export NODE_ENV=production
*/
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



http.createServer(app).listen(app.get('port'), init);

function init (){
  logger.loginfo('Express server listening on port ' + app.get('port'));
};

app.get('/', routes.index);

// REST resources
app.get('/songs', songRoutes.list);
app.get('/song/:id',songRoutes.listOne);
app.post('/song/add',songRoutes.add);
app.put('/song/:id',songRoutes.update);
app.del('/song/:id',songRoutes.delete);