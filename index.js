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
		.then(msg => messageDB.data.push({oldMessage:message.id,newMessage:msg.id,channel:msg.channel.id}));
    } else if (message.channel.id == '271349742099759104') {
        bot.channels.get('271350052188979201').sendMessage("**" + message.author.username + ":** " + message.content)
		.then(msg => messageDB.data.push({oldMessage:message.id,newMessage:msg.id,channel:msg.channel.id}));
    }
});
bot.on('messageUpdate', (oldMessage,newMessage)=>{
	if (newMessage.author.bot == true) return; // prevent double messages
	console.log("executing");
	let m = messageDB.data.find(function(messageObj)
				{	
					if(messageObj.oldMessage === oldMessage.id)
						return messageObj;
				});
	if(m)
	{
		//console.log(m);
		bot.channels.get(m.channel).fetchMessage(m.newMessage).edit("**" + message.author.username + ":** " +newMessage.content);
	}
});
bot.on('messageDelete', message=>{
	if (message.author.bot == true) return; // prevent double messages
	console.log("executing");
	let m = messageDB.data.find(function(messageObj)
				{	
					if(messageObj.oldMessage === message.id)
						return messageObj;
				});
	if(m)
	{
		//console.log(m);
		bots.channel.get(m.channel).fetchMessage(m.newMessage).delete().then(messageDB.data.splice(messageDB.data.indexOf(m),1)).catch(console.log);
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
