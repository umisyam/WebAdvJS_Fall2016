//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/food';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
	if (err) return console.log(err);
	console.log('Connection established to', url);

	// do some work here with the database.
	var food = db.collection('food');

	// display everything in our food collection
	food.find().toArray(function (err, result) {
	    if (err) return console.log(err)
	    	console.log(result);

	    //Close connection
		db.close();
	});

});