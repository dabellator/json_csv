var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Server up on port ' + port);
});
