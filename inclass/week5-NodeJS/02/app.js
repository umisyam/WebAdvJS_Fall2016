var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');	// express function
  // IS EQUAL TO:
  // res.write('Hello World'); // node function
  // res.end();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});