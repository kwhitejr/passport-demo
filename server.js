var express = require('express');

var CONFIG = require('./config');

var app = express();

app.set('views', 'views');
app.set('view engine', 'jade');

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', function (req, res) {
  //TODO: implement login
  res.send('logging in...');
});

app.get('/secret', function (req, res) {
  res.render('secret');
});

var server = app.listen(CONFIG.PORT, function () {
  console.log('listening on port ' + CONFIG.PORT);
});

// If you want to add logic to the config file, then you must convert it to module.exports object.