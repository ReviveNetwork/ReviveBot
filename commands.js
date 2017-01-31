const bot = require('./bot');
const functions = require('./functions');
const bf2 = require('./bf2');
const bf2142 = require('./bf2142');

bot.on('message', message =>{
	if(!message.content.startsWith('~'))
	{return;}//base case
	var cmd  = message.content.split(' ')[0].substring(1).toLowerCase();
	commands[cmd].exec(message);
});
var commands={
	'pong': {
		description:'reply with a pong',
		syntax: '~ping',
		exec: function(message)
		{
			message.reply('pong');
		}
	},
	'yo':{
		description:'reply with a yo bro',
		syntax: '~yo',
		exec: function(message)
		{
			message.reply('yo bro');
		}
	},
	'link':{
		description:'link revive account to this discord account',
		syntax: '~link',
		exec: function(message){
			functions.integrate(message.author);
		}
	},
	'refresh':{
		description:'refresh a user discord link status',
		syntax: '~refresh',
		exec: function(message){
			if(message.content.substring(9).trim()=='all'
				&& message.member.roles.find('moderator')!=undefined
				&& message.guild.name == 'Revive Netowrk')
			{
				functions.refreshAll(message.guild.members.array())
			}
			else
			{
				functions.refresh(message.user,message.member);
			}
		}
	},
	'bf2':{
		description:'finds a bf2 player',
		syntax: '~bf2 <PlayerName>',
		exec: function(message){
			if(message.mentions.users.first!=undefined)
			{
				
			}
			else
			{
				var nick = message.content.substring(5).trim();
				var plist = bf2.getPlayers(nick); 
				console.log("BF2 in index.js gets executed"); 
				if (plist == null) { 
					message.channel.sendMessage("API Down or invalid search"); 
					return; 
					} 
					if (plist.length >= 1) { 
						//checking for exact matches 
						var exact = plist.find(o => o.nick.toUpperCase().trim() === nick.toUpperCase()); 
						console.log(exact); var res = "**S.no.\tName \t PID \t Score**";
					}
					var start = 0; 
					var past = 0; 
					if (exact != null) { 
						res = res + "\n" + (1) + "\t" + "\t" + exact.str();
						 start++ ;
						 } 
						 for (var i = start; i < plist.length; i++)
						  { 
						 	if (exact != null && i == plist.indexOf(exact)) 
						  	{ 
						  		past++; 
						  		continue; 
								} 
							if (i == 26) {
  							res = res + "\n" + (plist.length - 25) 
  							 + " more players found to Get a full list of players \n" 
  							 + "<https://battlelog.co/player_search.php?q=" + nick + ">"; 
  							 break; 
  							} else 
  							{
  								 res = res + " \n" + (i + 1 - past) 
  								 + "\t" + "\t" + plist[i].str(); 		  
  								message.channel.sendMessage(res); 
  										 	 
  							} 
  						}
  					if (plist.length == 0) 
  					{ message.channel.sendMessage("Player not found"); }
			}
		}
	},
	'bf2142':{
		description:'finds a bf2142 player',
		syntax: '~bf2142 <PlayerName>',
		exec: function(message){
			if(message.mentions.users.first!=undefined)
			{
				
			}
			else
			{
				var nick = message.content.substring(7).trim();
				var plist = bf2142.getPlayers(nick); 
				console.log("BF2142 in index.js gets executed"); 
				if (plist == null) { 
					message.channel.sendMessage("API Down or invalid search"); 
					return; 
					} 
					if (plist.length >= 1) { 
						//checking for exact matches 
						var exact = plist.find(o => o.nick.toUpperCase().trim() === nick.toUpperCase()); 
						console.log(exact); var res = "**S.no.\tName \t PID**";
					}
					var start = 0; 
					var past = 0; 
					if (exact != null) { 
						res = res + "\n" + (1) + "\t" + "\t" + exact.str();
						 start++ ;
						 } 
						 for (var i = start; i < plist.length; i++)
						  { 
						 	if (exact != null && i == plist.indexOf(exact)) 
						  	{ 
						  		past++; 
						  		continue; 
								} 
							if (i == 26) {
  							res = res + "\n" + (plist.length - 25) 
  							 + " more players found to Get a full list of players \n" 
  							 + "<https://battlelog.co/player_search.php?q=" + nick + ">"; 
  							 break; 
  							} else 
  							{
  								 res = res + " \n" + (i + 1 - past) 
  								 + "\t" + "\t" + plist[i].str(); 		  
  								message.channel.sendMessage(res); 
  										 	 
  							} 
  						}
  					if (plist.length == 0) 
  					{ message.channel.sendMessage("Player not found"); }
			}
		}
	},
	'cookie':{
		description: 'eats a cookie',
		syntax: '~cookie',
		exec: function(message){
			message.reply('crunch crunch');
		}
	},
	'add':{
		description: 'adds a person to a role',
		syntax: '~add <UserMention> to <roleName>',
		exec: function(message){
			if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
				 message.channel.sendMessage("You aren't Worthy"); return; } 
				 var member = message.guild.member(message.mentions.users.first()); 
				 var msg = message.content.split("to "); 
				 member.addRole(message.guild.roles.find("name", msg[msg.length - 1])); 
				 message.reply('done');
		}
	},
	'remove':{
		description: 'removes a person to a role',
		syntax: '~remove <UserMention> from <roleName>',
		exec: function(message){
			if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
				 message.channel.sendMessage("You aren't Worthy"); return; } 
				 var member = message.guild.member(message.mentions.users.first()); 
				 var msg = message.content.split("to "); 
				 member.removeRole(message.guild.roles.find("name", msg[msg.length - 1])); 
				 message.reply('done');
		}
	},
	'help':{
		description: 'displays help',
		syntax: '~help',
		exec: function(message){
			var res = "";
			for(cmd in commands)
			{
				res  = res +"\n"+"**"+cmd+"** - "+"_"+ commands[cmd].description+"_";
				res  = res +"\n"+"Syntax: *"+commands[cmd].syntax+"*";
			}
			message.reply(res);
		}
	}
}