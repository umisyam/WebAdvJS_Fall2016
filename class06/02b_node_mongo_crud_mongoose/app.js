// mongoose setup
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds049456.mlab.com:49456/test-song');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Everyhting is inside this big chunk of code
db.once('open', function() {
  console.log("we're connected!");

  /* Now that we're connected, we start first by creating Schema. In Mongoose, everything is derived from a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.*/
  var songSchema = mongoose.Schema({
    decade: String,
    artist: String,
    song: String,
    weeksAtOne: Number
  });

  // To use our Schema, we need to convert our songSchema into a Model we can work with
  var Song = mongoose.model('songs', songSchema);

  // Then, we construct new songs based on our model
  var one = new Song({
      decade: '1970s',
      artist: 'Debby Boone',
      song: 'You Light Up My Life',
      weeksAtOne: 10
    }),
    two = new Song({
      decade: '1980s',
      artist: 'Olivia Newton-John',
      song: 'Physical',
      weeksAtOne: 10
    }),
    three = new Song({
      decade: '1990s',
      artist: 'Mariah Carey',
      song: 'One Sweet Day',
      weeksAtOne: 16
    }),
    four = new Song({
      decade: '2000s',
      artist: 'Black Eyed Peas',
      song: 'I Gotta Feeling',
      weeksAtOne: 14
    }),
    five = new Song({
      decade: '2010s',
      artist: 'Mark Ronson',
      song: 'Uptown Funk',
      weeksAtOne: 14
    });

    // ------ 1. INSERT
    // one.save();
    // two.save();
    // three.save();
    // four.save();
    // five.save();
    // db.close();

    // ------ 2. UPDATE
    // Song.update(
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
    // Song.find({}, function (err, result) {
    // Song.find({ weeksAtOne: {$gte:14} }).exec(function (err, result) {
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
    // Song.findOneAndRemove(
    //   { decade: '1970s' },
    //   function(err, result) {
    //     if(err) throw err;
    //     console.log("Delete 1970s!");
    //     db.close();
    //   });

    // Since this is an example, we'll clean up after ourselves.
    // mongoose.connection.db.collection('songs').drop(function (err) {
    //     if(err) throw err;
    //     db.close();
    // });

});

// For more function examples see the documentation: http://mongoosejs.com/docs/guide.html

// Great simple Mongoose tutorial:
// https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
