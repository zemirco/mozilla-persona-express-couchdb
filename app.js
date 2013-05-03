
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

// csp middleware
// Important: twitter and ghbtns are not needed!
// they are here for the demo
// style-src 'unsafe-inline' is required for chrome+jquery bug
var policy =  "default-src 'self';" +
              "frame-src 'self' https://login.persona.org https://platform.twitter.com http://platform.twitter.com http://ghbtns.com;" +
              "script-src 'self' https://login.persona.org http://platform.twitter.com;" +
              "style-src 'self' 'unsafe-inline'";

app.use(function(req, res, next) {
  // Firefox and Internet Explorer
  res.header("X-Content-Security-Policy", policy);
  // Safari and Chrome
  res.header("X-WebKit-CSP", policy);
  // continue with next middleware
  next();
});

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
app.use(express.csrf());

// custom middleware
app.use(function(req, res, next) {
  // csrf
  res.locals.token = req.session._csrf;
  // cookie
  if (req.session.email) {
    res.cookie('email', req.session.email);
  }
  // continue with router
  next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// middleware to restrict access to internal routes
function restrict(req, res, next) {
  if (req.session.email) {
    next();
  } else {
    res.redirect('/');
  }
}

// set username to null for all routes
// means we only have to pass it to our views when we actually have a username
app.locals.username = null;

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
app.get('/', index.get);
app.post('/auth/login', auth.login);
app.get('/auth/logout', auth.logout);
app.get('/profile', restrict, profile.get);
app.post('/profile', restrict, profile.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
