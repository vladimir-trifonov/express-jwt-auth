'use strict';

var router = require('express').Router(),
	unless = require('express-unless'),
	jwt = require('express-jwt');

var utils = require('../common/utils.js'),
	NotFoundError = require('../errors').NotFound;

module.exports = function(app, config) {
	var jwtCheck = jwt({
		secret: config.secret
	});
	jwtCheck.unless = unless;

	app.use(jwtCheck.unless({
		path: '/api/login'
	}));
	app.use(utils.middleware().unless({
		path: '/api/login'
	}));

	app.use('/api', require('./default.js')());

	// all other requests redirect to 404
	router.all('*', function(req, res, next) {
		next(new NotFoundError('404'));
	});

	app.use(router);
};