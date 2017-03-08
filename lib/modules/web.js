const express = require('express');
const bodyParser = require('body-parser');
const bot = require('../utils/bot');
const refreshUser = require('./link/refreshuser');
let app = express();

app.use(bodyParser.json())

app.get('/push/user/:userId/updated', function (req, res) {
	//console.log(req);
	//console.log(req.params);
	console.log(req.params.userId);
	refreshUser(bot.users.get(req.params.userId));
	res.send('updated');
	res.end();
});

var listener = app.listen(8080, function () {
	console.log('API now running on port: ' + listener.address().port);
});

module.exports = app;
