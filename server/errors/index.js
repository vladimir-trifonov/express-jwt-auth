'use strict';

var NotFound = require('./NotFoundError'),
	UnauthorizedAccess = require('./UnauthorizedAccessError');

module.exports = {
	NotFound: NotFound,
	UnauthorizedAccess: UnauthorizedAccess
}