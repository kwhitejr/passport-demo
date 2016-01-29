var express = require('express');

var CONFIG = require('./config');
console.log(CONFIG);

var app = express();



var server = app.listen(CONFIG.PORT, function () {
  console.log('listening on port ' + CONFIG.PORT);
});
