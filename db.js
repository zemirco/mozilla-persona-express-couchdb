
var nano = require('nano');
// user and pw for CouchDB are not included in repo - use your own instance
var config = {};

if (process.env.NODE_ENV === 'production') {
  // use environment variables on heroku
  config.user = process.env.user;
  config.pw = process.env.pw;
} else {
  // use local config during development
  config = require('./config.prod.js');
}

// create database connection
var db = nano('https://' + config.user + ':' + config.pw + '@mirco.cloudant.com/blog-persona-example/');

module.exports = db;