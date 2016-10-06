// This exercise uses EJS as the templating engine for Express. If you want to learn how to do it in Handlebars, see this example:
//	http://code.runnable.com/U07z_Y_j9rZk1tTx/handlebars-template-examples-with-express-4-for-node-js
//	https://www.packtpub.com/books/content/using-handlebars-express

/*---------- BASIC SETUP ----------*/
var express		= require('express'),
	bodyParser	= require('body-parser'),
	MongoClient = require('mongodb').MongoClient;

var app = express();
var db;

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Express server
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('incoming request from ---> ' + ip);
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);	// Show the URL user just hit by user
    next();
});

app.set('view engine', 'ejs')
app.use('/', express.static(__dirname + '/public'));
/*---------------------------------*/


/*-------------- APP --------------*/

// MONGO SETUP
var uri = 'mongodb://hippie:hippie@ds015730.mlab.com:15730/hipster-dictionary';

MongoClient.connect(uri, function(err, database){
	if (err) return console.log(err);
	db = database;
	console.log("Database connection ready");

	var words = db.collection('words');

	// ROUTERS
	app.get('/', function(req, res){
		words.find().toArray(function(err, result){
			if (err) return console.log(err);
			console.log(result);
			res.render('index.ejs', {words: result})
		});
	});

	app.post('/words', function(req, res){
		words.save(req.body, function(err, result){
			if (err) return console.log(err);
			console.log('saved to database')
			res.redirect('/')
		});
	});

	// We move this here because we want to start our server only if our database is connected
	var PORT = 3000;
	app.listen(PORT, function(){
		console.log('Express server is running at ' + PORT);
	});

});

