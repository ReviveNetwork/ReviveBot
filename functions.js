const urlencode = require('urlencode');
const bot = require('./bot');
const request = require('request');

module.exports = {};
exports = module.exports;

exports.addRole = function(rolename, userid) {
    var user = bot.users.get(userid);
    var guild = bot.guilds.get("256299642180861953");
    var role = guild.roles.find("name", rolename);
    if (guild.member(user).roles.indexOf(role) < 0) {
        guild.member(user).addRole(role);
        bot.sendMessage(user, "Role Added: " + role.name);
    }
};

exports.removeRole = function(rolename, userid) {
    var user = bot.users.get(userid);
    var guild = bot.guilds.get("256299642180861953");
    var role = guild.roles.find("name", rolename);
    if (guild.member(user).roles.indexOf(role) >= 0) {
        guild.member(user).rempveRole(role);
        bot.sendMessage(user, "Role removed: " + role.name);
    }
};

exports.integrate = function(user) {
    //user is an user onject. get it using message.author
    let id = urlencode(new Buffer(JSON.stringify({
        id: user.id,
        name: user.username
    })).toString('base64'));
    var res = "To link your discord account and forum account, please follow the below link \n https://battlelog.co/discord_link.php?id=" + id;
    user.sendMessage(res);
};

exports.refreshUser = function(user) {
    //user is an user onject. get it using message.author
    //dont execute the statements untill api implemented
    request("http://revive-bot-discord.revive.systems/v0/discord/userinfo/"+user.id,function (error, response, body) {
    if(error)
    {
        console.log(error+":"+response.statusCode);
    }
        var info = JSON.parse(body);
    if (info.is_donator == true) {
        exports.addRole("Donator", user.id);
    } else {
        exports.removeRole("Donator", user.id);
    }
    if(info.is_admin)
    {
        exports.addRole("discordadmins", user.id);
    }
    if(info.is_mod)
    {
        exports.addRole("moderator", user.id);
    }
    if(info.usergroup == 8)
    {
        exports.addRole("ingame moderator", user.id);
    }
    var guild = bot.guilds.get("256299642180861953");
    var member  = guild.member(user);
    member.setNickname(info.username);
    });
};
