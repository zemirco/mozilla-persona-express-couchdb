
var db = require('../db.js');

/*
 * GET home page.
 */

exports.get = function(req, res){
  var email = req.session.email;
  
  // new user
  if (!email) {
    res.render('index', {
      title: 'Express',
      email: email,
      username: null
    });
    return
  }
  
  // returning user -> get username
  db.get(email, function(err, doc) {
    if (err) console.log(err);
    console.log(doc);
    res.render('index', {
      title: 'Express',
      email: email,
      username: doc.username
    });
  })
};