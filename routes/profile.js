
var db = require('../db.js');

/**
 * GET /profile
 *
 * Identify user via session and get information from db.
 */
exports.get = function(req, res) {
  var email = req.session.email;

  db.view('users', 'byEmail', {key: email}, function(err, body) {
    res.render('profile', {
      title: 'Your profile',
      email: req.session.email,
      username: body.rows[0].value.username
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
  db.view('users', 'byEmail', {key: email}, function(err, body) {
    if (err) console.log(err);
    // set username property
    console.log(body.rows);
    var doc = body.rows[0].value;
    doc.username= username;
    // save document to db
    db.insert(doc, function(err, body) {
      res.render('profile', {
        title: 'Your profile',
        email: email,
        username: username
      })
    })
  });

};