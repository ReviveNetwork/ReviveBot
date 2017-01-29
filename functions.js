const urlencode = require('urlencode');
const bot = require('./bot');
const request = require('request');

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

exports.refreshUser = function(user) {
    //user is an user onject. get it using message.author
    //dont execute the statements untill api implemented
    console.log(user);
    var id = user.id;
    console.log(id);
    request("http://revive-bot-discord.revive.systems/v0/discord/userinfo/" + id, function(error, response, body) {
        if (error) {
            console.log(error + ":" + response.statusCode);
        }
        console.log(body);
        var info = JSON.parse(body);
        var guild = bot.guilds.find("name", "Revive Network");
        var member = guild.member(user);
        if (info.is_donator == true) {
            member.addRole(guild.roles.get('273105185566359562'));
        } else {
            member.removeRole(guild.roles.get("273105185566359562"));
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
    });
};
