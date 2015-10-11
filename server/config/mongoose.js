'use strict';

var mongoose = require('mongoose');

/**
 * Mongoose connect
 */
module.exports = function(config) {
	mongoose.connect(config.db);

	var db = mongoose.connection;

	db.once('open', function callback() {
		console.log("Mongoose connected to the database");
	});

	db.on('error', function(err) {
		console.log('Mongoose connection error: ' + err);
	});
};