/**
* songModel
* defines schema for song table in mongodb database
* I'm not pretending to provide a kind of DAO, but
* 'Old habits are hard to break'.
* @Pello Xabier Altadill Izura
* @greetz GoF
*/


exports.songModel = function (config) {
	// self reference
	var self = this;

	var mongodb = require('mongoose');

	this.songs;
	this.songSchema;
	var db;
	
  	/**
  	* init
  	*/
  	this.init = function () {

  		mongodb.connect('mongodb://localhost/musicdb');
  		db = mongodb.connection;
		this.songSchema = new mongodb.Schema({ artist: {type: String}, 
										  song: {type: String}, 
										  album: {type: String}, 
										  rating: {type: Number}  });

		this.songs = mongodb.model('songs', this.songSchema);
  	};

};