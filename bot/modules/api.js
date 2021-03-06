const express = require('express');
const bodyParser = require('body-parser');
const bot = require('../bot');
const refreshUser = require('./../lib/refresh');
const discourse_events = require('./../lib/discourse_events')
let app = express();
const path = require('path');
let ready = false;
const commands = require('./../commands');
app.use(bodyParser.json())
bot.on('ready', () => { ready = true; });
app.post('/push/user/:userId/updated', function (req, res) {
    //console.log(req);
    //console.log(req.params);
    if (!ready) return;
    console.log("Recieved Refresh request for <@" + req.params.userId + ">");
    refreshUser(bot.users.get(req.params.userId));
    res.send('updated');
    res.end();
});
app.post('/push/user/:userId/:userId2/transfer', function (req, res) {
    //console.log(req);
    //console.log(req.params);
    if (!ready) return;
    console.log("Recieved link transfer request from <@" + req.params.userId + "> to <@" + req.params.userId + ">")
    if (req.params.userId != req.params.userId2) {
        let guild = bot.guilds.get("184536578654339072");
        let m1 = guild.member(req.params.userId);
        let m2 = guild.member(req.params.userId2);
        m1.roles.map(async function (r) {
            if (r.name.includes("everyone")) return;
            m2.addRole(r);
        });

        refreshUser(m1.user);
        refreshUser(m2.user);
    }
    else
        refreshUser(bot.users.get(req.params.userId));
    res.send('updated');
    res.end();
});
app.get('/sql/messages', function (req, res) {
    var file = path.resolve(__dirname, '..', '..', 'dev.sqlite3');
    res.download(file);
    res.end();
});
app.get('/logs', function (req, res) {
    res.jsonp(commands.access_log);
    res.end();
});
app.post('/notify', function (req, res) {
    if (!ready) return;
    let event = req.headers['x-discourse-event-type'];
    let event_handler;
    if (!event) {
        return res.end(JSON.stringify(req.headers));
    }
    else if (event.toLowerCase() == 'post')
        event_handler = discourse_events.post;
    else if (event.toLowerCase() == 'user')
        event_handler = discourse_events.user;
    else if (event.toLowerCase() == 'ping')
        event_handler = discourse_events.ping;
    let body = req.body;
    if (typeof body === 'string')
        body = JSON.parse(body);
    body.base_url = req.headers['x-discourse-instance'];
    if (event_handler)
        event_handler(req.body);
    res.sendStatus(202);
    res.end();
});
app.get('/reverse/:id', async function (req, res) {
    if (!ready) return;
    console.log("Recieved reverse link request for <@" + req.params.id + ">")
    const user = bot.users.get(req.params.id);
    const guild = bot.guilds.get("184536578654339072");
    const member = guild.member(user);
    if (!member) {
        res.json({ is_admin: false, is_mod: false });
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
    result.is_mod = roles.includes("352193753005424650");
    result.is_admin = roles.includes("353200495604793345") || roles.includes("184684916833779712");
    res.json(result);
    res.end();
});
app.all('*', function (req, res) {
    console.log("Recieved request on an invalid route \n" + req.method + " " + req.originalUrl);
    res.end('{ "error": "Invalid route" }')
});
var listener = app.listen(8080, function () {
    console.log('API now running on port: ' + listener.address().port);
});

module.exports = app;
