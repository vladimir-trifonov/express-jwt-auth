'use strict';

var path = require('path');

var rootPath = path.join(__dirname, '/../../');

/**
 * Environment settings and configs
 */
var config = {
	development: {
		db: "localhost/express-jwt-auth" || process.env.MONGOOSE_URI,
		http_port: process.env.HTTP_PORT || 3000,
		path: {
			root: rootPath
		},
		secret: 'jhv43ghc4fy34ih3k4h3hgv43cgf4c3uhkg4jk3hn4lkn34b3jhv4jh3b4kj3n'
	},
	production: {
		db: process.env.MONGOOSE_URI,
		http_port: process.env.HTTP_PORT,
		path: {
			root: rootPath
		}
	},
	secret: 'jhv43ghc4fy34ih3k4h3hgv43cgf4c3uhkg4jk3hn4lkn34b3jhv4jh3b4kj3n'
}

module.exports = config;