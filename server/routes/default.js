'use strict';

var debug = require('debug')('app:routes:default' + process.pid),
	_ = require('lodash'),
	Router = require('express').Router;

var utils = require('../common/utils'),
	UnauthorizedAccessError = require('../errors').UnauthorizedAccessError,
	User = require('../models/user.js');

var authenticate = function(req, res, next) {
	debug('Processing authenticate middleware');

	var username = req.body.username,
		password = req.body.password;

	if (_.isEmpty(username) || _.isEmpty(password)) {
		return next(new UnauthorizedAccessError('401', {
			message: 'Invalid username or password'
		}));
	}

	process.nextTick(function() {
		User.findOne({
			username: username
		}, function(err, user) {
			if (err || !user) {
				return next(new UnauthorizedAccessError('401', {
					message: 'Invalid username or password'
				}));
			}

			user.comparePassword(password, function(err, isMatch) {
				if (isMatch && !err) {
					debug('User authenticated, generating token');
					utils.create(user, req, res, next);
				} else {
					return next(new UnauthorizedAccessError('401', {
						message: 'Invalid username or password'
					}));
				}
			});
		});
	});
};

module.exports = function() {
	var router = new Router();

	router.route('/verify').get(function(req, res) {
		return res.status(200).json(undefined);
	});

	router.route('/logout').get(function(req, res, next) {
		if (utils.expire(req.headers)) {
			delete req.user;
			return res.status(200).json({
				'message': 'User has been successfully logged out'
			});
		} else {
			return next(new UnauthorizedAccessError('401'));
		}
	});

	router.route('/login').post(authenticate, function(req, res) {
		return res.status(200).json(req.user);
	});

	router.unless = require('express-unless');

	return router;
};

debug('Loaded');