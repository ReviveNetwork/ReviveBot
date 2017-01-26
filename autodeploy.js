const express = require('express');
const bodyParser = require('body-parser');
let app = express(); 
app.use(bodyParser.json()) 
app.post('/deploy/', function(req, res) { 
require('child_process').exec('git fetch git@github.com:ReviveNetwork/ReviveBot.git', {stdio: 'inherit'});
res.send("Completed");
 });
 var listener = app.listen(process.env.PORT || 8000, function() { console.log('API now running on port: ' + listener.address().port);});