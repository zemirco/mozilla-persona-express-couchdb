
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

// routes
var index = require('./routes/index.js');
var profile = require('./routes/profile.js');
var auth = require('./routes/auth.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.cookieSession());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var restrict = function(req, res, next) {
  if (req.session.email) {
    next();
  } else {
    res.redirect('/');
  }
};

app.locals.username = null;

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.get);
app.post('/auth/login', auth.login);
app.get('/auth/logout', auth.logout);
app.get('/profile', restrict, profile.get);
app.post('/profile', restrict, profile.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
