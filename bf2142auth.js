var express = require('express');
var php = require("node-php");
var path = require("path");

var app = express();

app.use("/bf2142auth/", php.cgi("php/index.php"));

var listener = app.listen(process.env.PORT || 8080, function() {
    console.log('API now running on port: ' + listener.address().port);
});
