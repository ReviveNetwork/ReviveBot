var bot = require('./bot');
var config = require('./config');
let messageDB = {data:[]}; //require('./messagedb.json');
const functions = require('./functions');
fs = require('fs');
if(!messageDB.data)
{messageDB.data = new Array();}
bot.on('message', message => {
    if (message.author.bot == true) return; // prevent loop
    let attach='';
    if(message.attachments.size>0)
	{attach= '\n'+message.attachments.first().url;}
    if (message.content.toLowerCase().includes('hi') || message.content.toLowerCase().includes('hello') || message.content.toLowerCase().includes('hey')) {
        if(message.isMentioned(bot.user))
	message.channel.sendMessage('hello');
        return;
    }
    if (message.channel.id == '271350052188979201') {
        bot.channels.get('271349742099759104').sendMessage("**" + message.author.username + ":** " + message.cleanContent+attach)
		.then(msg => messageDB.data.push({oldMessage:message.id,newMessage:msg.id,channel:msg.channel.id}));
    } else if (message.channel.id == '271349742099759104') {
        bot.channels.get('271350052188979201').sendMessage("**" + message.author.username + ":** " + message.cleanContent+attach)
		.then(msg => messageDB.data.push({oldMessage:message.id,newMessage:msg.id,channel:msg.channel.id}));
    }
});
bot.on('messageUpdate', (oldMessage,newMessage)=>{
	if (newMessage.author.bot == true) return; // prevent double messages
	console.log("executing");
	let attach='';
    if(newMessage.attachments.size>0)
	{attach= '\n'+newMessage.attachments.first().url;}
	let m = messageDB.data.find(function(messageObj)
				{	
					if(messageObj.oldMessage === oldMessage.id)
						return messageObj;
				});
	if(m)
	{
		//console.log(m);
		bot.channels.get(m.channel).fetchMessage(m.newMessage).edit("**" + message.author.username + ":** " +newMessage.cleanContent+attach);
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
		bot.channels.get(m.channel).fetchMessage(m.newMessage).then(msg => msg.delete()).then(messageDB.data.splice(messageDB.data.indexOf(m),1)).catch(console.log);
	}
});
bot.on("guildMemberAdd", (member) => {
    var user = member.user;
    user.sendMessage("Welcome to the Revive Network");
    functions.refreshUser(user);
});
