var express = require('express');
var app = express();

// Express has built-in functions named after other HTTP verbs (GET, POST, PUT, DELETE), so you can call:
// app.get(..)
// app.post(..)
// app.put(..)
// app.delete(..)

// Responding with String
app.get('/', function (req, res) {
   console.log("Got a GET request for /string");
   res.send('This is default');
})

app.get('/string', function (req, res) {
   console.log("Got a GET request for /string");
   res.send('Hi my name is Umi');
})

// Responding with String with pattern matching: abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

//Responding with JSON blocks
app.get('/json', function(req, res) {
 var things = ['lamp', 'couch', 'tv'];
 // Normally, we do:
 // res.send(things);
 // if we're responding with JSON, better use this instead: (although it does the same thing)
 res.json(things);
});

//Responding with HTML blocks
app.get('/html', function(req, res) {
 var blocks = '<ul><li>One</li><li>Two</li></ul>';
 res.send(blocks);
});

// -----------------------------------
// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})


/*---------- BASIC SETUP ----------*/
var PORT = 4000;
app.listen(PORT, function(){
	console.log('Express server is running at ' + PORT);
});
/*---------------------------------*/