
var nano = require('nano');
// not included in repo - use your own CouchDB instance
var config = require('./config.prod.js');

var db = nano('https://' + config.user + ':' + config.pw + '@mirco.cloudant.com/blog-persona-example/');

module.exports = db;