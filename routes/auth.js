
var request = require('request');
var db = require('../db.js');

/**
 * POST /auth/login
 *
 * Route is part of Persona integration. It is called by navigator.id.watch -> onlogin.
 * Take the assertion sent from the client and verify against Persona Verifier.
 * If assertion is valid store email in session  and check if user is already in db.
 * If user isn't in db insert a new user document with an empty username property.
 * If user is already in db just send 200 - OK.
 */
exports.login = function(req, resp) {
  
  var audience;
  if (process.env.NODE_ENV === 'production') {
    audience = 'http://mysterious-coast-9759.herokuapp.com/'
  } else {
    audience = 'http://localhost:3000/'
  }
  
  request.post({
    url: 'https://login.persona.org/verify',
    json: {
      assertion: req.body.assertion,
      audience: audience
    }
  }, function(err, res, body) {
    console.log(body);
    if (err) console.log(err);
    if (body.status === 'okay') {
      var email = body.email;
      req.session.email = email;
      // check if email is already saved in db
      db.head(email, function(err, body, header) {
        if (err) console.log(err);
        if (err && err.status_code === 404) {
          // email is not in db
          var doc = {
            username: ''
          };
          db.insert(doc, email, function(err, body) {
            if (err) console.log(err);
            resp.send(200);
          })
        } else {
          // email is already stored in db
          resp.send(200);
        }
      });
    }
  });

};

/**
 * GET /auth/logout
 *
 * Route is part of Persona integration. It is called by navigator.id.watch -> onlogout.
 * Destroy session, delete cookie and redirect user to index page.
 */
exports.logout = function(req, res) {
  req.session = null;
  res.clearCookie('email');
  res.redirect('/');
};