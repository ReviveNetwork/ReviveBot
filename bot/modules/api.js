const express = require('express');
const bodyParser = require('body-parser');
const bot = require('../bot');
const refreshUser = require('./../lib/refresh');
const discourse_events = require('./../lib/discourse_events')
let app = express();
const path = require('path');

app.use(bodyParser.json())

app.get('/push/user/:userId/updated', function (req, res) {
    //console.log(req);
    //console.log(req.params);
    console.log(req.params.userId);
    refreshUser(bot.users.get(req.params.userId));
    res.send('updated');
    res.end();
});
app.get('/sql/messages', function (req, res) {
    var file = path.resolve(__dirname, '..', '..', 'dev.sqlite3');
    res.download(file); // Set disposition and send it.
});
app.post('/notify', function (req, res) {
    let event_handler = discourse_events[req.headers['X-Discourse-Event-Type']];
    let body = req.body;
    body.base_url = req.headers['X-Discourse-Instance'];
    event_handler(req.body);
    res.sendStatus(202);
    res.end();
});
app.get('/reverse/:id', async function (req, res) {
    const user = bot.users.get(req.params.id);
    const guild = bot.guilds.get("184536578654339072");
    const member = guild.member(user);
    if (!member) {
        res.json({ "error": "cant link" });
        return res.end();
    }
    const roles = member.roles.map((r) => {
        return r.id;
    })
    let result = {};
    let r = await refreshUser(user);
    if (!r) {
        res.json({ "error": "cant link" });
        return res.end();
    }
    result.name = r.username;
    result.is_mod = roles.includes("184676864630063104");
    result.is_admin = roles.includes("200849956796497920") || roles.includes("184684916833779712");
    res.json(result);
    res.end();
});
var listener = app.listen(8080, function () {
    console.log('API now running on port: ' + listener.address().port);
});

module.exports = app;
