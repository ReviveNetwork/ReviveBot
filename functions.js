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
	var guild = bot.guilds.get('184536578654339072');
	var member = guild.member(user);
    console.log(user);
    var id = user.id;
    console.log(id);
	request("http://revive-bot-discord.revive.systems/v0/discord/userinfo/" + id,function (error, response, body) {
    if(error || response.statusCode != 200)
    {console.log('error: '+ response.statusCode+'\n'+body);return;}
    var info = JSON.parse(body);
	console.log(info);
    if(info.hasOwnProperty('error'))
	{exports.integrate(user);return;}
    member.addRole(guild.roles.find("name", "verified members"));
	//member.removeRole(guild.roles.find("name", "members"));
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
   // member.setNickname(info.username);
	});
};
exports.refreshAll = function(array) {
    setTimeout(function(){
		var member = array.pop();
		exports.refreshUser(member.user)
		exports.refreshAll(array)
		},3000);
};
