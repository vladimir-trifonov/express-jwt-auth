'use strict';

var debug = require('debug')('app:' + process.pid),
	env = process.env.NODE_ENV || 'development',
	//path = require('path'),
	//fs = require('fs'),
	express = require('express'),
	app = express();

var config = require('./config/config')[env];

debug('Starting application');

debug('Loading Mongoose functionality');
require('./config/mongoose')(config);

debug('Initializing express');
require('./config/express')(app);

debug('Initialize routes');
require('./routes')(app, config);

debug('Initialize middlewares');
require('./middlewares')(app);

debug('Creating HTTP server on port: %s', config.http_port);
require('http').createServer(app).listen(config.http_port, function() {
	debug('HTTP Server listening on port: %s, in %s mode', config.http_port, app.get('env'));
});

// debug('Creating HTTPS server on port: %s', config.https_port);
// require('https').createServer({
// 	key: fs.readFileSync(path.join(__dirname, 'keys', 'server.key')),
// 	cert: fs.readFileSync(path.join(__dirname, 'keys', 'server.crt')),
// 	ca: fs.readFileSync(path.join(__dirname, 'keys', 'ca.crt')),
// 	requestCert: true,
// 	rejectUnauthorized: false
// }, app).listen(config.https_port, function() {
// 	debug('HTTPS Server listening on port: %s, in %s mode', config.https_port, app.get('env'));
// });

exports.app = app;