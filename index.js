var bot = require('./bot');
const help = require('./help');
const fun = require('./fun');
const web = require('./web');
//const music = require('./music');
var commands = require('./commands');
var config = require('./config');

bot.on('message', message => {
    if (message.author.bot == true) return; // prevent loop
    if (message.content.toLowerCase() === 'hi' || message.content.toLowerCase() === 'hello' || message.content.toLowerCase() === 'hey') {
        message.reply('hello');
        return;
    }
    if (message.channel.id == '271350052188979201') {
        bot.channels.get('271349742099759104').sendMessage("**" + message.author.username + ":** " + message.content);
    } else if (message.channel.id == '271349742099759104') {
        bot.channels.get('271350052188979201').sendMessage("**" + message.author.username + ":** " + message.content);
    }
});
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    bot = require('./bot');
});
bot.on("guildMemberAdd", (member) => {
    var user = member.user;
    user.sendMessage("Welcome to the Revive Nwtowrk");
    functions.refreshUser(user);
});
bot.on('message', message => {
    if (message.content.toLowerCase() === '~stop') {
        if (message.guild != bot.guilds.find("name", "Revive Network Dev")) {
            return;
        };
        process.exit();
    }
});
