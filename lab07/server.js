//Author: Austin Gibson
//CS336 lab07
// node.js server & hello route for AJAX

const express = require('express');
const app = express();
const http_status = require("http-status-codes");
const bodyParser = require("body-parser")

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/hello', function(req, res) {
    res.send('{"message": "Hello, ' + req.query.name + '"}');
});


app.listen(3000, function () {
  console.log('CS336 lab07 server.js listening on port 3000');
  
});