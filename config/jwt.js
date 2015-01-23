var User = require('../app/models/user.js');

module.exports = function(app, jwt) {
  app.use(function(req, res, next) {
    // checking header, url parameters, or post parameters for the token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    // decoding the token
    if (token) {

      // verifying secret and checking expiration time that was specified inside of the routes
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          return res.status(403).send({ success : false, message : 'Failed to authenticate the token.' });
        } else {

          // if everything is correct then save the request to be used in other routes later
          req.decoded = decoded;

          next();
        }
      });
    } else {
      // if there is no token then return http 403 response
      return res.status(403).send({ success : false, message : 'No token provided' });
    }
  });
}
