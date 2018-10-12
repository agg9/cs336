//Author: Austin Gibson
//CS336 Lab06

var express = require('express');
var app = express();

var HttpStatus = require('http-status-codes');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static('public'));


app.post('/forms', function (req, res) {
  res.send('Hello, form POST!' + '<br> NAME: ' + req.body.user_name + '<br> EMAIL: ' + req.body.user_mail + '<br> MESSAGE : ' + req.body.user_message);
});

app.get('/request', function (req, res) {
  	res.status(HttpStatus.ACCEPTED);
  	res.send('Got a GET request');
});

app.head('/request', function (req, res) {
	res.status(HttpStatus.OK);
	res.send('Got a HEAD request');
});

app.post('/request', function (req, res) {
  	res.status(HttpStatus.ACCEPTED);
  	res.send('Got a POST request with data: ' + req.body.arg);
});

app.put('/request', function (req, res) {
  	res.status(HttpStatus.ACCEPTED);
  	res.end('Got a PUT request with data: ' + req.body.arg);
});
	
app.delete('/request', function (req, res) {
  	res.status(HttpStatus.ACCEPTED);
  	res.end('Got a PUT request with data: ' + req.body.arg);
});

app.all('*', function(req, res) {
	res.status(HttpStatus.NOT_FOUND);
	res.send("There is no data at the url address.  Try /request");
});



app.listen(3000, function () {
  console.log('CS336 Lab06 app.js listening on port 3000');
});
