const
    request = require('../../utils/rp')
bot = require('../../utils/bot');
integrate = require('./integrate');
module.exports = function (user) {
    var guild = bot.guilds.get('184536578654339072');
    var member = guild.member(user);
    //console.log(user);
    var id = user.id;
    console.log(id);
    return request("http://revive-bot-discord.revive.systems/v0/discord/userinfo/"+id).then(body => {
	console.log(body);
        try{var info = JSON.parse(body);}
	catch(e)
	    {
		throw e;
	    }
        if (info.hasOwnProperty('error'))
        { integrate(user); return "User " + user.username + " Not Linked. DMing user to link now"; }
        member.addRole(guild.roles.find("name", "verified members"));
        //member.removeRole(guild.roles.find("name", "members"));
        if (info.is_donator) {
            member.addRole(guild.roles.find("name", "donators")).then(user.sendMessage('Role added: donators'));
        } else {
            member.removeRole(guild.roles.find("name", "donators")).then(user.sendMessage('Role removed: donators'));
        }
        if (info.is_admin) {
            member.addRole(guild.roles.find("name", "discordadmins")).then(user.sendMessage('Role added: discordadmins'));
        }
        if (info.is_mod) {
            member.addRole(guild.roles.find("name", "moderator")).then(user.sendMessage('Role added: moderator'));
        }
        if (info.usergroup == 8) {
            member.addRole(guild.roles.find("name", "ingame moderator")).then(user.sendMessage('Role added: ingame moderator'));
        }
        // member.setNickname(info.username);
    });
};
