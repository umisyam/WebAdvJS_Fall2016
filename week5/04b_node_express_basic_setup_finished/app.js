/*---------- BASIC SETUP ----------*/
var express		= require('express'),
	bodyParser	= require('body-parser');	// helper for parsing HTTP requests

var app = express();	// our Express app

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());							// parse application/json

// Express server
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    // See CORS at https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('incoming request from ---> ' + ip);
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);	// Show the URL user just hit by user
    next();
});

app.use('/', express.static(__dirname + '/public'));
/*---------------------------------*/


/*-------------- APP --------------*/

// VARIABLES
var cities = {
	london: {
		temp_f: 61,
		temp_c: 16,
		wind_dir: 'S',
		wind: 7,
		humidity: 81
	},
	new_york: {
		temp_f: 85,
		temp_c: 16,
		wind_dir: 'SE',
		wind: 14,
		humidity: 67
	},
	paris: {
		temp_f: 72,
		temp_c: 22,
		wind_dir: 'SW',
		wind: 3,
		humidity: 41
	},
	beijing: {
		temp_f: 68,
		temp_c: 20,
		wind_dir: 'N',
		wind: 4,
		humidity: 83
	},
	sao_paulo: {
		temp_f: 82,
		temp_c: 28,
		wind_dir: 'W',
		wind: 14,
		humidity: 35
	}
};

// ROUTERS
app.get('/cities', function(request, response){
	console.log('The client just sent a ' + request.method +
				' request for ' + request.url);
	var names = [];
	for(var name in cities){
		console.log(name);
		names.push(name);
	}
	response.json(names);
});

// POST requests
app.post('/weather', function(request, response){
	console.log('The client just sent a ' + request.method +
				' request for ' + request.url);
	// Body parser puts everything inside a req.body object
	console.log(request.body['city']);

	// Send back the data
	response.json({
		city: request.body['city'],
		weather: cities[request.body['city']]
	});
});

/*---------------------------------*/


/*---------- BASIC SETUP ----------*/
var PORT = 3000;
app.listen(PORT, function(){
	console.log('Express server is running at ' + PORT);
});
/*---------------------------------*/