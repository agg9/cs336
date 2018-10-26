/* 
 * App.js is a server that handles requests based on homework2
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

myPersonList = [];

function Person(id, firstName, lastName, startDate) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.startDate = startDate;
  
  this.getid = function() {
    return this.id;
  }
  this.getFirstName = function() {
    return this.firstName;
  }
  this.getLastName = function() {
    return this.lastName;
  }
  this.getYear = function() {
    return this.year;
  }
}

myPersonList.push(new Person('1', 'Austin', 'Gibson', '1/1/2000'));
myPersonList.push(new Person('2', 'Billy', 'Bob', '2/10/1989'));
myPersonList.push(new Person('3', 'Sam', 'Dennen', '10/22/2005'));


app.get('/', function (req, res) {
  res.send('Homework1 home page');
});

app.get('/people', function (req, res) {
  res.json(myPersonList);
});

app.post('/people', function (req, res) {
  myPersonList.push(new Person(req.body.loginID, req.body.firstName, req.body.lastName, req.body.startDate));
  res.json(myPersonList[myPersonList.length-1]);
  console.log("Person creation success: " + req.body.firstName + " added"); 
});

app.get('/person/:id', function (req, res) {
  try {
  for(var i = 0; i <= 20; i++) {
    if(myPersonList[i].id == req.params["id"]) {
      res.json(myPersonList[i]);
      return;
    }
  }
  } catch(error) {
    
  res.status(404).send('User Not Found');
  }

});

app.put('/person/:id', function(req, res) {
  try {
    var id = req.params["id"];

    for(var i = 0; i <= 20; i++) {
      if(myPersonList[i].id == id) {
          myPersonList[i].id = req.body.loginID;
          myPersonList[i].firstName = req.body.firstName;
          myPersonList[i].lastName = req.body.lastName;
          myPersonList[i].startDate = req.body.startDate;
          console.log("A user has been updated.");
        return;
      }
    }
  } catch(error) {
    
    res.status(404).send('User Not Found');
  }

});

app.delete('/person/:id', function (req,res) {
  try {
    var id = req.params["id"];

    for(var i = 0; i <= 20; i++) {
      if(myPersonList[i].id == id) {
        console.log(myPersonList[i].firstName + " has been deleted.");
        myPersonList.splice(i, 1);
          
        return;
      }
    }
  } catch(error) {
    
    res.status(404).send('User Not Found');
  }

});

app.get('/person/:id/name', function (req, res) {
  try {
    var id = req.params["id"];

  for(var i = 0; i <= 5; i++) {
    if(myPersonList[i].id == req.params["id"]) {
        res.send(myPersonList[i].firstName +" " + myPersonList[i].lastName);
        console.log(myPersonList[i].firstName + " " + myPersonList[i].lastName +
          " has been returned");
      return;
    }
  }
  } catch(error) {
    
  res.status(404).send('User Not Found');
  }

});

app.get('/person/:id/years', function (req, res) {
  try {
    for(var i = 0; i <= 5; i++) {
      if(myPersonList[i].id == req.params["id"]) {
      
        var userStartDate = new Date(myPersonList[i].startDate);
        var newDate = new Date();
        
        var difference = Math.floor((newDate - userStartDate) /1000/60/60/24/365);

        res.send(myPersonList[i].firstName + " " + myPersonList[i].lastName + " has been here for " + difference + " years");

      return;
    }
  }
  } catch(error) {
    
  res.status(404).send('User Not Found');
  }

});

app.post('/getPerson', function(req, res) {
    
    for (var i = 0; i < myPersonList.length; i++) {
        if(myPersonList[i].id == req.body.loginID) {
            res.json(myPersonList[i]);
        }
    }
});

app.listen(3000, function () {
  console.log('CS336 Homework2 app.js listening on port 3000');
});
