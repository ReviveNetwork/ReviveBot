var bot = require('./bot');
const help = require('./help');
const web = require('./web');
//const music = require('./music');
var commands = require('./commands');
var config = require('./config');
var functions = require('./functions');
let messageDB = require('./messagedb.json');
fs = require('fs');
if(!messageDB.data)
{messageDB.data = new Array();}
bot.on('message', message => {
    if (message.author.bot == true) return; // prevent loop
    if (message.content.toLowerCase() === 'hi' || message.content.toLowerCase() === 'hello' || message.content.toLowerCase() === 'hey') {
        message.reply('hello');
        return;
    }
    if (message.channel.id == '271350052188979201') {
        bot.channels.get('271349742099759104').sendMessage("**" + message.author.username + ":** " + message.content)
		.then(msg => messageDB.data.push({oldMessage:message.id,newMessage:msg.id}));
    } else if (message.channel.id == '271349742099759104') {
        bot.channels.get('271350052188979201').sendMessage("**" + message.author.username + ":** " + message.content)
		.then(msg => messageDB.data.push({oldMessage:message,newMessage:msg}));
    }
});
bot.on('messageUpdate', (oldMessage,newMessage)=>{
	console.log("executing");
	if(newMessage.channel == '271350052188979201' ||newMessage.channel == '271349742099759104')
	{
		messageDB.find("oldMessage",oldMessage.id).newMessage.edit(newMessage.content);
	}
});
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
	fs.writeFileSync('messagedb.json', JSON.stringify(messageDB));
    bot = require('./bot');
});
process.on('Exit', function(code) {
	fs.writeFileSync('messagedb.json', JSON.stringify(messageDB));
});
bot.on("guildMemberAdd", (member) => {
    var user = member.user;
    user.sendMessage("Welcome to the Revive Network");
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
