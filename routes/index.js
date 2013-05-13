
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
  db.view('users', 'byEmail', {key: email}, function(err, body) {
    if (err) console.log(err);
    res.render('index', {
      title: 'Express',
      email: email,
      username: (body.rows[0] && body.rows[0].value.username)
    });
  })
};