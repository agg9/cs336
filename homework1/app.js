//Author: Austin Gibson
//CS336 Homework1

const express = require('express');
const app = express();
const port = 3000

var JSDataBase = [
  {
    "loginID" : "1",
    "firstName" : "Austin",
    "lastName" : "Gibson",
    "startDate" : "1-1-2016"
  },
  {
    "loginID" : "2",
    "firstName" : "Billy",
    "lastName" : "Joel",
    "startDate" : "2-2-2010"
  },
  {
    "loginID" : "3",
    "firstName" : "Trevor",
    "lastName" : "DeVries",
    "startDate" : "1-3-2012"
  },
  {
    "loginID" : "4",
    "firstName" : "Micah",
    "lastName" : "Isaac",
    "startDate" : "5-7-2008"
  },
  {
    "loginID" : "5",
    "firstName" : "Sam",
    "lastName" : "Dernen",
    "startDate" : "4-10-2000"
  }
]

app.get('/', function (req, res) {
  res.send('Homework1 home page');
});

app.get('/people', function (req, res) {
  res.json(JSDataBase);
});

app.get('/person/:id', function (req, res) {
  try {
  for(var i = 0; i <= 5; i++) {
    if(JSDataBase[i]["loginID"] == req.params["id"]) {
      res.json(JSDataBase[i]);
      return;
    }
  }
  } catch(error) {
    //id not found
  res.status(404).send('Not Found');
  }

});

app.get('/person/:id/name', function (req, res) {
  try {
  for(var i = 0; i <= 5; i++) {
    if(JSDataBase[i]["loginID"] == req.params["id"]) {
      res.send(JSDataBase[i]["firstName"] + JSDataBase[i]["lastName"]);
      return;
    }
  }
  } catch(error) {
    //id not found
  res.status(404).send('Not Found');
  }

});

app.get('/person/:id/years', function (req, res) {
  try {
  for(var i = 0; i <= 5; i++) {
    if(JSDataBase[i]["loginID"] == req.params["id"]) {
      // calculate the time person has been at company
      var userStartDate = new Date(JSDataBase[i]["startDate"]);
      var newDate = new Date();
      console.log(newDate - userStartDate);
      var difference = Math.floor((newDate - userStartDate) /1000/60/60/24/365);

      res.send(JSDataBase[i]["firstName"] + JSDataBase[i]["lastName"] + "has been here for " + difference + " years");

      
      return;
    }
  }
  } catch(error) {
    //id not found
  res.status(404).send('Not Found');
  }

});

app.listen(3000, function () {
  console.log('CS336 Homework1 app.js listening on port 3000');
});
