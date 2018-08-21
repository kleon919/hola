'use strict';

const Mongoose 	= require('mongoose');

// Move the credentials to config
let db = {
    username : "",
    password : "",
    host     : "",
    port     : "",
    name     : ""
}

// Connect to the database
const dbURI = "mongodb://" + 
			encodeURIComponent(db.username) + ":" + 
			encodeURIComponent(db.password) + "@" + 
			db.host + ":" + 
			db.port + "/" + 
			db.name;
Mongoose.connect(dbURI, { useNewUrlParser: true });

// Throw an error if the connection fails
Mongoose.connection.on('error', function(err) {
	if(err) throw err;
});

Mongoose.Promise = global.Promise;

module.exports = Mongoose;



