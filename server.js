var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var CONFIG = require('./config');

var app = express();

app.set('views', 'views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: false}));
app.use(session(CONFIG.SESSION));


passport.use(new LocalStrategy(
  function (username, password, done) {
    var isAuthenticated = authenticate(username, password);
    if (! isAuthenticated) {
      return done(null, false); // No error, but credentials fail.
    }
    var user = {
      name: "Kevin",
      role: "ADMIN",
      color: "blue"
    };
    return done(null, user); // good to go!!
  }
));

passport.serializeUser(function (user, done) {
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  return done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//   console.log(req.isAuthenticated());
// });

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login',
  passport.authenticate('local', {
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

function isAuthenticated (req, res, next) {
  console.log(req.user);
  if (! req.isAuthenticated()) {
    return res.redirect('/login');
  }
  return next();
}

app.get('/secret',
  isAuthenticated,
  function (req, res) {
    res.render('secret', {role: req.user.role});
  }
);

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

var server = app.listen(CONFIG.PORT, function () {
  console.log('listening on port ' + CONFIG.PORT);
});

// If you want to add logic to the config file, then you must convert it to module.exports object.