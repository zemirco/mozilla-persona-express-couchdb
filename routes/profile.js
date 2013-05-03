
var db = require('../db.js');

/**
 * GET /profile
 *
 * Identify user via session and get information from db.
 */
exports.get = function(req, res) {
  var email = req.session.email;

  db.get(email, function(err, doc) {
    res.render('profile', {
      title: 'Your profile',
      email: req.session.email,
      username: doc.username
    })
  })

};

/**
 * POST /profile
 *
 * Handle post request and save username to db.
 */
exports.post = function(req, res) {
  var email = req.session.email;
  var username = req.body.username;

  // get document from db
  db.get(email, function(err, doc) {
    if (err) console.log(err);
    // set username property
    doc.username= username;
    // save document to db
    db.insert(doc, email, function(err, body) {
      res.render('profile', {
        title: 'Your profile',
        email: email,
        username: username
      })
    })
  });

};