var mongodb = require('mongodb');

var data = [
  {
    decade: '1970s',
    artist: 'Debby Boone',
    song: 'You Light Up My Life',
    weeksAtOne: 10
  },
  {
    decade: '1980s',
    artist: 'Olivia Newton-John',
    song: 'Physical',
    weeksAtOne: 10
  },
  {
    decade: '1990s',
    artist: 'Mariah Carey',
    song: 'One Sweet Day',
    weeksAtOne: 16
  },
  {
    decade: '2000s',
    artist: 'Black Eyed Peas',
    song: 'I Gotta Feeling',
    weeksAtOne: 14
  },
  {
    decade: '2010s',
    artist: 'Mark Ronson',
    song: 'Uptown Funk',
    weeksAtOne: 14
  },
];

// MONGO SETUP
// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname
var uri = 'mongodb://admin:admin@ds049456.mlab.com:49456/test-song';

mongodb.MongoClient.connect(uri, function(err, db){
	if (err) return console.log(err);

	/*
	* First we'll add a few songs. Nothing is required to create the songs collection; it is created automatically when we insert.
	*/

	var songs = db.collection('songs');

  // ------ 1. INSERT
  // songs.insert(data, function(err, result) {
  //   if(err) throw err;
  //   console.log(result);
  //   db.close();
  // });

  // ------ 2. UPDATE
  // songs.update(
  //   { song: 'Uptown Funk' },
  //   { $set:
  //     { artist: 'Mark Ronson ft. Bruno Mars' }
  //   },
  //   function(err, result) {
  //     if(err) throw err;
  //     console.log("Successfully update one entry!");
  //     db.close();
  //   });

  // ------ 3. READ updated result
  // songs.find().toArray(function (err, result) {
  //   if(err) throw err;
  //   // console.log(result);
  //   result.forEach(function(song) {
  //     console.log(
  //       'In the ' + song.decade + ', ' + song.song + ' by ' + song.artist +
  //       ' topped the charts for ' + song.weeksAtOne + ' straight weeks.'
  //     );
  //   });

  //   db.close();
  // });

  // ------ 4. DELETE
  // songs.remove(
  //   { decade: '1970s' },
  //   function(err, result) {
  //     if(err) throw err;
  //     console.log("Delete 1970s!");
  //     db.close();
  //   });

  // Since this is an example, we'll clean up after ourselves and drop the entire collection
  // songs.drop(function (err) {
  //   if(err) throw err;
  //   db.close();
  // });
});