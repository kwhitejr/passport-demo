var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

var CONFIG = require('./config');

var app = express();

app.set('views', 'views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: false}));

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', function (req, res) {
  var isAuthenticated = authenticate(req.body.username, req.body.password);
  if (!isAuthenticated) {
    console.log('You are not authenticated');
    return res.redirect('/login');
  }
  res.redirect('/secret');
});

function authenticate(username, password) {
  var CREDENTIALS = CONFIG.CREDENTIALS;
  var USERNAME = CREDENTIALS.USERNAME;
  var PASSWORD = CREDENTIALS.PASSWORD;

  return (
    username === USERNAME &&
    password === PASSWORD
  );

}

app.get('/secret', function (req, res) {
  res.render('secret');
});

var server = app.listen(CONFIG.PORT, function () {
  console.log('listening on port ' + CONFIG.PORT);
});

// If you want to add logic to the config file, then you must convert it to module.exports object.