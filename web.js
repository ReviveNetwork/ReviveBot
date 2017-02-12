const express = require('express');
const bodyParser = require('body-parser');
const bot = require('./bot');
const functions = require('./functions');
let app = express();

app.use(bodyParser.json())

app.get('/push/user/:userId/updated', function(req, res) {
   // functions.refreshUser(bot.users.get(req.params.userId));

});

var listener = app.listen( 8080, function() {
    console.log('API now running on port: ' + listener.address().port);
});

module.exports = app;
