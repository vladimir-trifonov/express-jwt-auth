'use strict';

var compression = require('compression'),
	morgan = require('morgan'),
	bodyParser = require("body-parser");

/**
 * Set express options and define middlewares
 */
module.exports = function(app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(compression({
		level: 9
	}));

	app.use(require('response-time')());

	app.use(morgan('dev'));
}