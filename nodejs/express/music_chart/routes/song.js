/*
* routes/song.js
* Here we define the routes for each REST request to /song/ url
* We define the handlers for every request mapped in express server.
* 
* list:    mapped from GET /songs/  : read all from db.
* listOne: mapped from GET /song/id : read one record from db 
* add:     mapped from POST /song/  : adds a new record
* update:  mapped from PUT /song/id : updates existing record
* delete:  mapped from DELETE /song/id : deletes existing record
*
* @author Pello Xabier Altadill Izura
* @greetz For those interested in Android Async Tasks
*/

var logger;

var mySongModel;

// Sets logger instance
exports.setLogger = function (otherLogger) {
  logger = otherLogger;
};

// Sets song Model instance
exports.setSongModel = function (songModel) {
	mySongModel = songModel;
  mySongModel.init();
};

/******************
* REST resources  *
*******************/

/**
* READ all songs
* very simple, we use the model to make a find without parameters.
*/
exports.list = function(req, res){
    mySongModel.songs.find({},{}, function (err, allSongs) {
      if (err) {
        logger.logwarn('Song not found.');
        res.send('Song not found.');
      } else {
        logger.loginfo('We\'ve got them: ' +allSongs);
        res.send(JSON.stringify(allSongs));
      }
    });
};

/**
* READ one song
* we expect the _id an we pass to our model to make a find with a parameter
*/
exports.listOne = function(req, res){
  logger.loginfo('GET Song requested: ' + req.params.id);
    mySongModel.songs.find({_id:req.params.id},{}, function (err, oneSong) {
      if (err) {
        logger.logwarn('Song not found.');
        res.send('Song not found.');
      } else {
        logger.loginfo('We\'ve got it: ' +oneSong);
        res.send(JSON.stringify(oneSong));
      }
    });
};

/**
* ADD a new song.
* First we must create an Object with the params received and map to our schema.
* Then we can save the object.
*/
exports.add = function(req, res){
  var newSong = {
    artist : req.body.artist,
    song : req.body.song,
    album : req.body.album,
    rating : parseInt(req.body.rating)
  };
  logger.loginfo('POST add Song: ' + newSong);

  var songObj = new mySongModel.songs(newSong);

  /**
  * and now our schema is ready to be saved, or not.
  */
  songObj.save(function(err, data) {
      if (err) {
        logger.logerr('Error saving data');
        res.send('Error saving data: ' +err);
      }  else {
        logger.loginfo(data);
        res.send('Ok, new song saved: ' + data);
      }
  });

};

/**
* UPDATES a song
* easier than create, we define an array with update data and
* we try to update using the _id as search criteria
*/
exports.update = function(req, res){
  logger.loginfo('PUT Song requested: ' + req.params._id);
  songId = req.body._id;

  var updatedSong = {
    artist : req.body.artist,
    song : req.body.song,
    album : req.body.album,
    rating : parseInt(req.body.rating)
  };
  logger.loginfo('Trying to update Song: ' + updatedSong);

  /**
  * and now we try to update data
  */
     mySongModel.songs.update({_id:songId},updatedSong, function (err) {
        if (err) {
          logger.error('Error updating data: ' +err);
          res.send('Error updating data: ' +err);
        }  else {
          logger.loginfo('Ok, data updated');
          res.send('Ok, song updated: ' + songId);
         }
    });
};

/**
* DELETES a song.
* It expects just the _id and then tries to remove It from database.
*/
exports.delete = function(req, res){
  logger.loginfo('DELETE Song requested: ' + req.params.id);
    songId = req.params.id;

     mySongModel.songs.remove({_id : songId}, function(err) {
      if (err) {
        logger.logerror('No song with id: ' + songId);
        res.send('No song with id: ' + songId);
      } else {
        logger.loginfo('deleted ' + songId);
        res.send('Song deleted ' + songId);
      }
    });
  
};