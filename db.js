
var nano = require('nano');
// not included in repo - use your own CouchDB instance
var config = {};

if (process.env.NODE_ENV === 'production') {
  config.user = process.env.user;
  config.pw = process.env.pw;
} else {
  config = require('./config.prod.js');
}

var db = nano('https://' + config.user + ':' + config.pw + '@mirco.cloudant.com/blog-persona-example/');

module.exports = db;