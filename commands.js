const bot = require('./bot');
const functions = require('./functions');
const music = require('./music');
const bf2 = require('revive-stats.js').bf2;
const bf2142 = require('revive-stats.js').bf2142;
const Discord = require('discord.js')
const rank = require('./rank');
const request = require('request-promise');
const stats = require('./stats');
const math = require('mathjs');
const crypto = require('crypto');
const web = require('./web');
const help = require('./help');
const index = require('./hotline');

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
        exec: function (message) {
            message.reply('pong');
        }
    },
    'yo': {
        description: 'reply with a yo bro',
        syntax: '~yo',
        exec: function (message) {
            message.reply('yo bro');
        }
    },
    'link': {
        description: 'link revive account to this discord account',
        syntax: '~link',
        exec: function (message) {
            functions.integrate(message.author);
        }
    },
    'refresh': {
        description: 'refresh a user discord link status',
        syntax: '~refresh',
        exec: function (message) {
            if (message.content.toString().includes('all')) {
                functions.refreshAll(bot.guilds.get('184536578654339072').members.array())
            } else if (message.mentions.users.size != 0) {
                message.mentions.users.map(functions.refreshUser);
            } else {

                functions.refreshUser(message.author);
            }
        }
    },
    'bf2': {
        description: 'finds a bf2 player',
        syntax: '~bf2 <PlayerName>',
        exec: function (message) {
            let nick = message.content.substring(5).trim();
            bf2.getPlayers(nick).then(plist => {
                console.log("BF2 in index.js gets executed");
                if (plist == null) {
                    message.channel.sendMessage("API Down or invalid search");
                    return;
                }
                if (plist.length == 0) {
                    message.channel.sendMessage("Player not found");
                    return;
                }
				let res = "**S.no.\tName \t link**";
                for (let i = 0; i < plist.length; i++) {
                    if (i == 26) {
                        res = res + "\n" + (plist.length - 25) +
                            " more players found to Get a full list of players \n" +
                            "<https://battlelog.co/player_search.php?q=" + nick + ">";
                        break;
                    } else {
                        res = res + " \n" + (i + 1) +
                            "\t" + "\t" + str(plist[i], 'bf2');
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
        exec: function (message) {

            let nick = message.content.substring(7).trim();
            bf2142.getPlayers(nick).then(plist => {
                console.log("BF2142 in index.js gets executed");
                if (plist == null) {
                    message.channel.sendMessage("API Down or invalid search");
                    return;
                }
                if (plist.length == 0) {
                    message.channel.sendMessage("Player not found");
                    return;
                }
				let res = "**S.no.\tName \t link**";
                for (let i = start; i < plist.length; i++) {
                    if (i == 26) {
                        res = res + "\n" + (plist.length - 25) +
                            " more players found to Get a full list of players \n" +
                            "<https://battlelog.co/player_search.php?q=" + nick + ">";
                        break;
                    } else {
                        res = res + " \n" + (i + 1) +
                            "\t" + "\t" + str(plist[i]);
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
        exec: function (message) {
            message.reply('crunch crunch');
        }
    },
    'add': {
        description: 'adds a person to a role',
        syntax: '~add <UserMention> to <roleName>',
        exec: function (message) {
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
        exec: function (message) {
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
        exec: function (message) {
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
        exec: function (message) {
            url = message.content.substring(6).trim();
            music.play(url, message);
        }
    },
    'pause': {
        description: 'pauses the voice stream',
        syntax: '~pause',
        exec: function (message) {
            music.pause(message);
        }
    },
    'resume': {
        description: 'resumes the voice stream',
        syntax: '~resume',
        exec: function (message) {
            music.resume(message);
        }
    },
    'clear': {
        description: 'clears the playlist',
        syntax: '~clear',
        exec: function (message) {
            music.clear(message);
        }
    },
    'playnext': {
        description: 'plays the next song',
        syntax: '~playnext',
        exec: function (message) {
            music.playNext(message);
        }
    },
    'setvol': {
        description: 'sets the play volume',
        syntax: '~setVol',
        exec: function (message) {
            music.setVol(message.content.substring(7).trim());
        }
    },
    'queue': {
        description: 'views the queue',
        syntax: '~queue',
        exec: function (message) {
            music.queue(message);
        }
    },
    'info': {
        description: 'Gives the Battlelog Profile of a Verified User',
        syntax: '~info @usermention',
        exec: function (message) {
            rank.rank(message);
        }
    },
    'request': {
        description: 'execute a request',
        syntax: '~request <request>',
        exec: function (message) {
            if (message.guild != bot.guilds.get('256299642180861953')) {
                return;
            }
            var msg = message.content.substring(9).trim();
            var call = function (error, response, body) {
                if (error) {
                    message.reply(error);
                } else {
                    console.log(body)
                    if (body.length > 2000)
                        body = body.toString().substring(0, 1980) + "...";
                    message.channel.sendMessage("```Javascript\n" + body + '```');
                }
            };
            if (msg.startsWith('{')) msg = JSON.parse(msg)
            else msg = getOptions(msg);
            request(msg, call);
        }
    },
    'stats': {
        description: 'displays the guild stats',
        syntax: '~stats',
        exec: function (message) {
            stats.stats(message);
        }
    },
    'hash': {
        description: 'hashes a text.',
        syntax: '~hash <algorithm> <text>',
        exec: function (message) {
            let res = message.content.trim().substring(6);
            let algo = res.split(' ')[0];
            res = res.substring(algo.length + 1).trim();
            if (crypto.getHashes().indexOf(algo) === -1) {
                message.channel.sendMessage('Invalid algorithm \n Valid hashing Algorithms are:\n' + crypto.getHashes().join(' , '));
                return;
            }
            res = checksum(res, algo);
            console.log(res); message.channel.sendMessage('hash of message:' + res);
            if (message.attachments.size > 0) {
                res = message.attachments.first().url;
                request(res).then(body => message.channel.sendMessage('Hash of file:\n' + checksum(body, algo)));
            }
        }
    },
    'convert': {
        description: 'hashes a dec number to a different base.',
        syntax: '~convert <base> <decnumber>', exec: function (message) {
            let res = message.content.trim().substring(9);
            let base = res.split(' ')[0];
            res = res.substring(base.length + 1).trim();
            base = parseInt(base);
            res = parseInt(res).toString(base);
            console.log(res); message.channel.sendMessage(res);
        }
    }
}
const str = function (soldier, game) {
    if (game == 'bf2')
    { game = 'https://battlelog.co/bfhq.php?pid=' }
    else
    { game = 'https://bl2142.co/bfhq.php?pid=' }
    return soldier.nick + '\t' + "<" + game + soldier.pid + ">";
};
const getOptions = function (URL) {
    return {
        url: URL,
        headers: {
            'User-Agent': 'GameSpyHTTP/1.0'
        }
    };
};
function checksum(str, algorithm) {
    console.log(str);
    console.log(algorithm);
    return crypto
        .createHash(algorithm || 'md5')
        .update(str)
        .digest('hex')
}
