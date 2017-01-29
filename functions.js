const urlencode = require('urlencode');
const bot = require('./bot');
const request = require('sync-request');

module.exports = {};
exports = module.exports;

exports.addRole = function(roleName, userid) {
    var user = bot.users.get(userid);
    var guild = bot.guilds.get("256299642180861953");
    var role = guild.roles.find("name", rolename);
    if (guild.member(user).roles.indexOf(role) < 0) {
        guild.member(user).addRole(role);
        bot.sendMessage(user, "Role Added: " + role.name);
    }
};

exports.removeRole = function(roleName, userid) {
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
    var info = JSON.parse(request('GET',"http://revive-bot-discord.revive.systems/v0/discord/userinfo/"+user.id).getBody('utf8'));
    if (info.is_donator == true) {
        addRole("Donator", user.id);
    } else {
        removeRole("Donator", user.id);
    }
    if(info.is_admin)
    {
        addRole("discordadmins", user.id);
    }
    if(info.is_mod)
    {
        addRole("moderator", user.id);
    }
    if(info.usergroup == 8)
    {
        addRole("ingame moderator", user.id);
    }
    var guild = bot.guilds.get("256299642180861953");
    var member  = guild.member(user);
    member.setNickname(info.username);
};
