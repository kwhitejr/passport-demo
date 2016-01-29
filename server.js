var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var CONFIG = require('./config');

var app = express();

app.set('views', 'views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: false}));

passport.use(new LocalStrategy(
  function (username, password, done) {
    var isAuthenticated = authenticate(username, password);
    if (! isAuthenticated) {
      return done(null, false);
    }
    return done(null, {}); // good to go!!
  }
));

app.use(passport.initialize());

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login',
  passport.authenticate('local', {
    session: false,
    successRedirect: '/secret',
    failureRedirect: '/login'
  })
);

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