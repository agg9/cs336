/**
 * Author: Austin Gibson
 * Code modified from @Facebook reserves all rights not expressly granted.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
    
var db;

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


MongoClient.connect('mongodb://cs336:'+process.env.MONGO_PASSWORD+'@ds155243.mlab.com:55243/agg9cs336', function (err, client) {
    if (err) throw err

    db = client;

    app.listen(app.get('port'), function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    })

    db.collection('comments').find().toArray(function (err, result) {
        if (err) throw err

        console.log(result);
    })
});


// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {

    db.collection('comments').find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        res.json(docs);
    });
});

app.post('/api/comments', function(req, res) {

    db.collection('comments').insert( {
        id: Date.now(),
        author: req.body.author,
        text: req.body.text
    });
});


