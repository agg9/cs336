/** Author: Austin Gibson
 *	Date: 9/12/2018
 *
 *  Lab02 Homework. Javascript for encapsulation, inheritance and polymorphism
 */

 
function Person(name, birthdate) {
	this.name = name;
	this.birthdate = birthdate;
	this.friends = [];
}

Person.prototype.changeName = function(newName) {
	this.name = newName;
};

//based off code from Naveen Jose
Person.prototype.getAge = function() {
    var today = new Date();
    var birthDate = new Date(this.birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

Person.prototype.addFriends = function(newFriend) {
	this.friends.push(newFriend);
};

Person.prototype.printGreeting = function(greeting) {
	console.log(this.name + " says '" + greeting + "'");
};


//Testing Person Object Prototype

var person1 = new Person("John", "01/22/1991", "I'm a person");
var person2 = new Person("Bob", "03/05/1996", "Hello");
var person3 = new Person("Jim", "10/15/1983", "Greeting");

person1.addFriends(person2);
person1.addFriends(person3);
person2.addFriends(person3);

person1.printGreeting("I like the name Austin better");
person1.changeName("Austin");
console.log(person1.name + "s age is " + person1.getAge());
console.log(person2.name + "s age is " + person2.getAge());
console.log(person3.name + "s age is " + person3.getAge());


// student inhertance

function Student(name, birthday, friends, study) {
	Person.call(this, name, birthday, friends);

	this.study = study;
}

Student.prototype.newGreeting = function(greeting) {
	console.log(this.name + " says '" + greeting + "'");
};

Student.prototype = Object.create(Person.prototype);

//Testing Student Object Prototype

var student1 = new Student("Jake", "12/12/1997", "Computer Science");
var student2 = new Student("Drew", "05/20/1996", "Engineering");
console.log(student1.name + "s age is " + student1.getAge());
console.log(student2.name + "s age is " + student2.getAge());
student2.addFriends(student1);
student1.printGreeting("I'm a student");


//instance checking

console.log(student1 instanceof Student);
console.log(student1 instanceof Person);
console.log(person1 instanceof Person);
console.log(person1 instanceof Student);