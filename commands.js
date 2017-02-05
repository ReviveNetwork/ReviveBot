const bot = require('./bot');
const functions = require('./functions');
const music = require('./music');
const bf2 = require('./bf2');
const bf2142 = require('./bf2142');
const Discord = require('discord.js')
const rank = require('./rank');
const request = require('request-promise');
const stats = require('./stats');
const math = require('mathjs');

bot.on('message', message => {
    if (!message.content.startsWith('~')) {
        return;
    } //base case
    var cmd = message.content.split(' ')[0].substring(1).toLowerCase();
    if (commands.hasOwnProperty(cmd))
        commands[cmd].exec(message);
});
var commands = {
    'ping': {
        description: 'reply with a pong',
        syntax: '~ping',
        exec: function(message) {
            message.reply('pong');
        }
    },
    'yo': {
        description: 'reply with a yo bro',
        syntax: '~yo',
        exec: function(message) {
            message.reply('yo bro');
        }
    },
    'link': {
        description: 'link revive account to this discord account',
        syntax: '~link',
        exec: function(message) {
            functions.integrate(message.author);
        }
    },
    'refresh': {
        description: 'refresh a user discord link status',
        syntax: '~refresh',
        exec: function(message) {
            if (message.content.substring(9).trim() == 'all' &&
                message.guild.name == 'Revive Netowrk Dev') {
                functions.refreshAll(bot.guilds.get('184536578654339072').members.array())
            } else if(message.mentions.users) {
		message.mentions.users.map(refreshUser);
		}else{
		
                functions.refreshUser(message.author);
            }
        }
    },
    'bf2': {
        description: 'finds a bf2 player',
        syntax: '~bf2 <PlayerName>',
        exec: function(message) {
            var nick = message.content.substring(5).trim();
            bf2.getPlayers(nick).then(plist => {
                console.log("BF2 in index.js gets executed");
                if (plist == null) {
                    message.channel.sendMessage("API Down or invalid search");
                    return;
                }
                if (plist.length >= 1) {
                    //checking for exact matches 
                    var exact = plist.find(o => o.nick.toUpperCase().trim() === nick.toUpperCase());
                    console.log(exact);
                    var res = "**S.no.\tName \t PID \t Score\t Rank**";
                }
                if (plist.length == 0) {
                    message.channel.sendMessage("Player not found");
                    return;
                }
                var start = 0;
                var past = 0;
                if (exact != null) {
                    res = res + "\n" + (1) + "\t" + "\t" + bf2.str(exact);
                    start++;
                }
                for (var i = start; i < plist.length; i++) {
                    if (exact != null && i == plist.indexOf(exact)) {
                        past++;
                        continue;
                    }
                    if (i == 26) {
                        res = res + "\n" + (plist.length - 25) +
                            " more players found to Get a full list of players \n" +
                            "<https://battlelog.co/player_search.php?q=" + nick + ">";
                        break;
                    } else {
                        res = res + " \n" + (i + 1 - past) +
                            "\t" + "\t" + bf2.str(plist[i]);
                    }
                }
                message.channel.sendMessage(res);
                console.log(res);
            });
        }
    },
    'bf2142': {
        description: 'finds a bf2142 player',
        syntax: '~bf2142 <PlayerName>',
        exec: function(message) {

            let nick = message.content.substring(7).trim();
            bf2142.getPlayers(nick).then(plist => {
                console.log("BF2142 in index.js gets executed");
                if (plist == null) {
                    message.channel.sendMessage("API Down or invalid search");
                    return;
                }
                if (plist.length >= 1) {
                    //checking for exact matches 
                    var exact = plist.find(o => o.nick.toUpperCase().trim() === nick.toUpperCase());
                    console.log(exact);
                    var res = "**S.no.\tName \tRank**";
                }
                if (plist.length == 0) {
                    message.channel.sendMessage("Player not found");
                    return;
                }
                var start = 0;
                var past = 0;
                if (exact != null) {
                    res = res + "\n" + (1) + "\t" + "\t" + bf2142.str(exact);
                    start++;
                }
                for (var i = start; i < plist.length; i++) {
                    if (exact != null && i == plist.indexOf(exact)) {
                        past++;
                        continue;
                    }
                    if (i == 26) {
                        res = res + "\n" + (plist.length - 25) +
                            " more players found to Get a full list of players \n" +
                            "<https://battlelog.co/player_search.php?q=" + nick + ">";
                        break;
                    } else {
                        res = res + " \n" + (i + 1 - past) +
                            "\t" + "\t" + bf2142.str(plist[i]);
                    }
                }
                message.channel.sendMessage(res);
                console.log(res);
            });
        }
    },
    'cookie': {
        description: 'eats a cookie',
        syntax: '~cookie',
        exec: function(message) {
            message.reply('crunch crunch');
        }
    },
    'add': {
        description: 'adds a person to a role',
        syntax: '~add <UserMention> to <roleName>',
        exec: function(message) {
            if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
                message.channel.sendMessage("You aren't Worthy");
                return;
            }
            var member = message.guild.member(message.mentions.users.first());
            var msg = message.content.split("to ");
            member.addRole(message.guild.roles.find("name", msg[msg.length - 1]));
            message.reply('done');
        }
    },
    'remove': {
        description: 'removes a person to a role',
        syntax: '~remove <UserMention> from <roleName>',
        exec: function(message) {
            if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
                message.channel.sendMessage("You aren't Worthy");
                return;
            }
            var member = message.guild.member(message.mentions.users.first());
            var msg = message.content.split("to ");
            member.removeRole(message.guild.roles.find("name", msg[msg.length - 1]));
            message.reply('done');
        }
    },
    'help': {
        description: 'displays help',
        syntax: '~help',
        exec: function(message) {
            var embed = new Discord.RichEmbed().setTitle('HELP').setColor("#FF7F50");
            for (cmd in commands) {
                embed.addField(cmd, "Description: " + commands[cmd].description + "\n" + "Syntax: " + commands[cmd].syntax);
            }
            //embed.addField('Music',"Description: Access the music bot using - as the prefix" + "\n"+ "Syntax: -help");
            message.channel.sendEmbed(embed);
        }
    },
    'play': {
        description: 'plays the youtube url specified',
        syntax: '~play <youtube_url>',
        exec: function(message) {
            url = message.content.substring(6).trim();
            music.play(url, message);
        }
    },
    'pause': {
        description: 'pauses the voice stream',
        syntax: '~pause',
        exec: function(message) {
            music.pause(message);
        }
    },
    'resume': {
        description: 'resumes the voice stream',
        syntax: '~resume',
        exec: function(message) {
            music.resume(message);
        }
    },
    'clear': {
        description: 'clears the playlist',
        syntax: '~clear',
        exec: function(message) {
            music.clear(message);
        }
    },
    'playnext': {
        description: 'plays the next song',
        syntax: '~playnext',
        exec: function(message) {
            music.playNext(message);
        }
    },
    'setvol': {
        description: 'sets the play volume',
        syntax: '~setVol',
        exec: function(message) {
            music.setVol(message.content.substring(7).trim());
        }
    },
    'queue': {
        description: 'views the queue',
        syntax: '~queue',
        exec: function(message) {
            music.queue(message);
        }
    },
    'info': {
        description: 'Gives the Battlelog Profile of a Verified User',
        syntax: '~info @usermention',
        exec: function(message) {
            rank.rank(message);
        }
    },
    'request': {
        description: 'execute a request',
        syntax: '~request <request>',
        exec: function(message) {
            if (message.guild != bot.guilds.get('256299642180861953')) {
                return;
            }
            var msg = message.content.substring(9).trim();
            var call = function(error, response, body) {
                if (error) {
                    message.reply(error);
                } else {
                    console.log(body)
                    if (body.length < 2000)
                        message.channel.sendMessage("```Javascript\n" + body + '```');
                }
            };
            if (msg.startsWith('{')) msg = JSON.parse(msg);
            request(msg, call);
        }
    },
    'stats': {
        description: 'displays the guild stats',
        syntax: '~stats',
        exec: function(message) {
            stats.stats(message);
        }
    },
    'calc': {
        description: 'evalutes a mathematical expression',
        syntax: '~calc <expression>',
        exec: function(message) {
            let res = message.content.substring(6)//.match(/[ 0-9\%\(\)\^\/\+\-\*]+/);
           // res = res.join(' ');
            message.channel.sendMessage(math.eval(res));
        }
    }
}
