
var request = require('request');
var db = require('../db.js');

exports.login = function(req, resp) {

  request.post({
    url: 'https://login.persona.org/verify',
    json: {
      assertion: req.body.assertion,
      audience: 'http://mysterious-coast-9759.herokuapp.com/'
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
            console.log(body);
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

exports.logout = function(req, res) {
  req.session = null;
  res.redirect('/');
};