const urlencode = require('urlencode');
const bot = require('./bot');
const request = require('request');

module.exports = {};
exports = module.exports;

exports.addRole = function(rolename, user) {
    var guild = bot.guilds.get("256299642180861953");
    var role = guild.roles.find("name", rolename);
    guild.member(user).addRole(role);
    console.log(user.username+ "Role Added: " + role.name);
};

exports.removeRole = function(rolename, user) {
    var guild = bot.guilds.get("256299642180861953");
    var role = guild.roles.find("name", rolename);
    guild.member(user).removeRole(role);
    console.log(user.username+ "Role removed: " + role.name);
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
    console.log(user);
    var id = user.id;
    console.log(id);
    request("http://revive-bot-discord.revive.systems/v0/discord/userinfo/"+id,function (error, response, body) {
    if(error)
    {
        console.log(error+":"+response.statusCode);
    }
        console.log(body);
        var info = JSON.parse(body);
    if (info.is_donator == true) {
        exports.addRole("Donator", user);
    } else {
        exports.removeRole("Donator", user);
    }
    if(info.is_admin)
    {
        exports.addRole("discordadmins", user);
    }
    if(info.is_mod)
    {
        exports.addRole("moderator", user);
    }
    if(info.usergroup == 8)
    {
        exports.addRole("ingame moderator", user);
    }
    var guild = bot.guilds.get("256299642180861953");
    var member  = guild.member(user);
    member.setNickname(info.username);
    });
};
