
var db = require('../db.js');

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

exports.post = function(req, res) {
  var email = req.session.email;

  // get document from db
  db.get(email, function(err, doc) {
    if (err) console.log(err);
    // set username property
    doc.username= req.body.username;
    // save document to db
    db.insert(doc, email, function(err, body) {
      res.render('profile', {
        title: 'Your profile',
        email: email,
        username: req.body.username
      })
    })
  });

};