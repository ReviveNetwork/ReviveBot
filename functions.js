const urlencode = require('urlencode');
const bot = require('./bot');
const request = require('sync-request');

module.exports = {};
exports = module.exports;

exports.integrate = function(user) {
    //user is an user onject. get it using message.author
    let id = urlencode(new Buffer(JSON.stringify({
        id: user.id,
        name: user.username
    })).toString('base64'));
    var res = "To link your discord account and forum account, please follow the below link \n https://battlelog.co/discord_link.php?id=" + id;
    user.sendMessage(res);
};

exports.refreshUser = function(user,member) {
    //user is an user onject. get it using message.author
    //dont execute the statements untill api implemented
    console.log(user);
    var id = user.id;
    console.log(id);
    body = request("GET","http://revive-bot-discord.revive.systems/v0/discord/userinfo/" + id);
    var info = JSON.parse(body.getBody());
    var guild = member.guild;
    if (info.is_donator) {
        member.addRole(guild.roles.find("name", "donators"));
    } else {
        member.removeRole(guild.roles.find("name", "donators"));
    }
    if (info.is_admin) {
        member.addRole(guild.roles.find("name", "discordadmins"));
    }
    if (info.is_mod) {
        member.addRole(guild.roles.find("name", "moderator"));;
    }
    if (info.usergroup == 8) {
        member.addRole(guild.roles.find("name", "ingame moderator"));
    }
    member.setNickname(info.username);
};
exports.refreshAll = function(array) {
    setTimeout(function{
		exports.refreshUser(array.pop().user,array()[i])
		exports.refreshAll(array)
		},1000);
};