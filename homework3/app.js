/* 
 * App.js is a server that handles requests based on homework3
 * -Added functionality for mongoDB
 * @Author Austin Gibson
 * CS336 Fall 2018
 *
 */

const express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', (process.env.PORT || 3000));

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
    
var db;

MongoClient.connect('mongodb://cs336:'+process.env.MONGO_PASSWORD+'@ds155243.mlab.com:55243/agg9cs336', function (err, client) {
    if (err) throw err

    db = client;

    app.listen(app.get('port'), function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    })

    db.collection('personlist').find().toArray(function (err, result) {
        if (err) throw err

        console.log(result);
    })
});


app.get('/', function (req, res) {
  res.send('Homework3 home page');
});

app.get('/people', function (req, res) {
  db.collection('personlist').find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        res.json(docs);
    });
});

app.post('/people', function (req, res) {
  db.collection('personlist').insert( {
        loginid: req.body.loginID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        startDate: req.body.startDate
    });

  console.log("Person creation success: " + req.body.firstName + " added"); 
  return;
});

app.get('/person/:id', function (req, res) {

  try {
    db.collection('personlist').find({}).toArray(function(err, docs) {
        docs.forEach( function(myDoc) {
          if(myDoc.loginid == req.params["id"]) {
            res.json(myDoc);
        }
      })
    })

  } catch(error) {
    res.status(404).send('User Not Found');
  }

});

app.put('/person/:id', function(req, res) {

  try {

    db.collection('personlist').update (
        { loginid: req.params["id"] },
        { $set: { loginid: req.body.loginID, 
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  startDate: req.body.startDate} },
        function(err, result) {
            if (err) throw err;

            console.log("1 document updated");
        }

      )

  } catch(error) {

    res.status(404).send('User Not Found');
  } 

});

app.delete('/person/:id', function (req,res) {

  try {
    var myquery = { loginid: req.params["id"] };

    db.collection('personlist').deleteOne(myquery, function(err, obj) {
      if(err) throw err;
      console.log('1 document deleted');
    })

  } catch(error) {
    res.status(404).send('User Not Found');
  } 

});

app.get('/person/:id/name', function (req, res) {

  try {
    db.collection('personlist').find({}).toArray(function(err, docs) {
        docs.forEach( function(myDoc) {
          if(myDoc.loginid == req.params["id"]) {
            res.send(myDoc.firstName + " " + myDoc.lastName);
            console.log(myDoc.firstName + " " + myDoc.lastName + " has been returned");
          return;
        }
      })
    })

  } catch(error) {
    res.status(404).send('User Not Found');
  }

});

app.get('/person/:id/years', function (req, res) {

  try {
    db.collection('personlist').find({}).toArray(function(err, docs) {
        docs.forEach( function(myDoc) {
          if(myDoc.loginid == req.params["id"]) {
            var userStartDate = new Date(myDoc.startDate);
            var newDate = new Date();
        
            var difference = Math.floor((newDate - userStartDate) /1000/60/60/24/365);

            res.send(myDoc.firstName + " " + myDoc.lastName + " has been here for " + difference + " years");
          return;
        }
      })
    })

  } catch(error) {
    res.status(404).send('User Not Found');
  }

});

