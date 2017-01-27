const express = require('express');
const bodyParser = require('body-parser');
const bot = require('./bot');
const functions =  require('./functions'); 
const deploy = require('./autodeploy.js');
let app = express();

app.use(bodyParser.json())

app.get('/push/user/:userId/updated', function(req, res) {
    functions.refresh(bot.users.get(req.params.userId));
    
});
app.get('/', function(req, res) {
    res.sendFile('/html/index.html');
});

app.post('/deploy/', function(req, res) { 
deploy.deploy();
res.send("Completed");
 });

var listener = app.listen(process.env.PORT || 8080, function() {
    console.log('API now running on port: ' + listener.address().port);
});

module.exports = app;
