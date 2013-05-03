
var db = require('../db.js');

/**
 * GET /
 *
 * Render the index view. Check if we have a new or existing user by verifying the session.
 * If user is already in db pass username as extra property to view.
 */
exports.get = function(req, res){
  var email = req.session.email;
  
  // new user
  if (!email) {
    res.render('index', {
      title: 'Express',
      email: null
    });
    return
  }
  
  // returning user -> get username
  db.get(email, function(err, doc) {
    if (err) console.log(err);
    res.render('index', {
      title: 'Express',
      email: email,
      username: doc.username
    });
  })
};