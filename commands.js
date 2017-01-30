exports.commands={
	'pong': {
		description:'reply with a pong',
		exec: function(message,text)
		{
			message.reply('pong');
		}
	},
	'yo':{
		description:'reply with a yo bro',
		exec: function(message,text)
		{
			message.reply('yo bro');
		}
	},
	'link':{
		description:'link revive account to this discord account',
		exec: function(message,text){
			functions.integrate(message.author);
		}
	},
	'refresh':{
		description:'refresh a user discord link status',
		exec: function(message,text){
			if(text=='all'
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
		exec: function(message,text){
			if(message.mentions.users.first!=undefined)
			{
				
			}
			else
			{
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
		exec: function(message,text){
			if(message.mentions.users.first!=undefined)
			{
				
			}
			else
			{
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
		exec: function(message,text){
			message.reply('crunch crunch');
		}
	},
	'add':{
		description: 'adds a person to a role',
		exec: function(message,text){
			if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
				 message.channel.sendMessage("You aren't Worthy"); return; } 
				 var member = message.guild.member(message.mentions.users.first()); 
				 var msg = message.content.split("to "); 
				 member.addRole(message.guild.roles.find("name", msg[msg.length - 1])); message.reply('done');
		}
	},
	'remove':{
		description: 'removes a person to a role',
		exec: function(message,text){
			if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
				 message.channel.sendMessage("You aren't Worthy"); return; } 
				 var member = message.guild.member(message.mentions.users.first()); 
				 var msg = message.content.split("to "); 
				 member.removeRole(message.guild.roles.find("name", msg[msg.length - 1])); message.reply('done');
		}
	}
}