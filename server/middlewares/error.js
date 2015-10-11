'use strict';

/**
 * Error handler - Express middleware
 */
module.exports = function(app) {
  // Error handler
  app.use(function(err, req, res) {
    err && console.log(err);
    err.inner && console.log(err.inner);

    var code = 500,
      msg = {
        message: 'Internal Server Error'
      };

    switch (err.name) {
      case 'UnauthorizedAccessError':
      case 'NotFoundError':
        code = err.status;
        msg = err.inner;
        break;
      default:
        break;
    }

    return res.status(code).json(msg);
  });
};