const bot = require('./lib/utils/bot');
const music = require('./lib/modules/music');
const Discord = require('discord.js')
const rank = require('./lib/modules/rank');
const request = require('./lib/modules/request');
const stats = require('./lib/modules/stats');
const web = require('./lib/modules/web');
const help = require('./lib/modules/help');
const bf2 = require('./lib/modules/bf2');
const bf2142 = require('./lib/modules/bf2142');
const index = require('./lib/modules/hotline');
const integrate = require('./lib/modules/link/integrate');
const refresh = require('./lib/modules/link/refreshuser');
const addRole = require('./lib/modules/addrole');
const removeRole = require('./lib/modules/removerole');
const convert = require('./lib/modules/convert');
const hash = require('./lib/modules/hash');
//const cleverbot = require('./lib/modules/cleverbot');
const reactionNav = require('./lib/modules/reactionNav')

bot.on('message', message => {
    if (!message.content.startsWith('~')) {
        return;
    } //base case
    var cmd = message.content.split(' ')[0].substring(1).toLowerCase();
    if (commands.hasOwnProperty(cmd)) {
        let result = commands[cmd].exec(message);
        if (typeof result === 'Promise')
            result.catch(message.channel.sendMessage);
    }
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
        exec: (message) => {
            return integrate(message.author).then(message.channel.sendMessage);
        }
    },
    'refresh': {
        description: 'refresh a user discord link status',
        syntax: '~refresh',
        exec: function (message) {
            if (message.mentions.users.size != 0) {
                return message.mentions.users.map(refresh);
            } else {
                return refresh(message.author).then(() => message.channel.sendMessage("Linked"));
            }
        }
    },
    'bf2': {
        description: 'finds a bf2 player',
        syntax: '~bf2 <PlayerName>',
        exec: bf2
    },
    'bf2142': {
        description: 'finds a bf2142 player',
        syntax: '~bf2142 <PlayerName>',
        exec: bf2142
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
        exec: addRole
    },
    'remove': {
        description: 'removes a person to a role',
        syntax: '~remove <UserMention> from <roleName>',
        exec: removeRole
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
            return message.author.sendEmbed(embed).then(() => { message.reply("See your DM") });
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
        exec: music.pause
    },
    'resume': {
        description: 'resumes the voice stream',
        syntax: '~resume',
        exec: music.resume
    },
    'clear': {
        description: 'clears the playlist',
        syntax: '~clear',
        exec: music.clear
    },
    'playnext': {
        description: 'plays the next song',
        syntax: '~playnext',
        exec: music.playNext
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
        exec: music.queue
    },
    'info': {
        description: 'Gives the Battlelog Profile of a Verified User',
        syntax: '~info @usermention',
        exec: rank
    },
    'request': {
        description: 'execute a request',
        syntax: '~request <request>',
        exec: request
    },
    'stats': {
        description: 'displays the guild stats',
        syntax: '~stats',
        exec: stats
    },
    'hash': {
        description: 'hashes a text.',
        syntax: '~hash <algorithm> <text>',
        exec: hash
    },
    'convert': {
        description: 'hashes a dec number to a different base.',
        syntax: '~convert <base> <decnumber>',
        exec: convert
    }
}