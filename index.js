const request = require('sync-request');
var bot = require('./bot');
const functions = require('./functions');
const bf2 = require('./bf2');
const bf2142 = require('./bf2142');
const help = require('./help');
const fun = require('./fun');
const web = require('./web');

var config = require('./config');

bot.on('ready', () => {
    console.log('Bot ready');
    bot.channels.get(config.log_channel).sendMessage('Revive-Bot: STARTED');
});

bot.on('message', message => {
    var guild = bot.guilds.get("256299642180861953");
    if (message.author.bot == true) return; // prevent loop
    if (message.content.toLowerCase() === 'hi' || message.content.toLowerCase() === 'hello' || message.content.toLowerCase() === 'hey') {
        message.reply('hello');
        return;
    }
    if (message.content.startsWith('add') && message.content.includes('to')) {
        if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
            message.channel.sendMessage("You aren't  Worthy");
            return;
        }

        var member = message.guild.member(message.mentions.users.first());
        var msg = message.content.split("to ");
        member.addRole(message.guild.roles.find("name", msg[msg.length - 1]));
        message.reply('done');
        return;
    }
    if (message.content.startsWith('remove') && message.content.includes('from')) {
        if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
            message.channel.sendMessage("You aren't  Worthy");

            return;
        }

        var member = message.guild.member(message.mentions.users.first());
        var msg = message.content.split("from ");
        member.removeRole(message.guild.roles.find("name", msg[msg.length - 1]));
        message.reply('done');
        return;
    }
    if (message.channel.id == '271350052188979201') {
        bot.channels.get('271349742099759104').sendMessage("**" + message.author.username + ":** " + message.content);
    } else if (message.channel.id == '271349742099759104') {
        bot.channels.get('271350052188979201').sendMessage("**" + message.author.username + ":** " + message.content);
    }
    if (message.content.startsWith('~')) {
        console.log(message.author.username + " : " + message.content);
    } else {
        return;
    }
    if (message.content.toLowerCase() === '~ping') {
        message.reply('pong');
        return;
    }
    if (message.content.toLowerCase() === '~yo') {
        message.reply('yo bro');
        return;
    }
    if (message.content.toLowerCase() === '~cookie') {
        message.reply('crunchcrunch');
        return;
    }
    if (message.content.toLowerCase() === '~link') {
        functions.integrate(message.author);
        return;
    }
    if (message.content.toLowerCase() === '~refresh') {
        functions.refreshUser(message.author);
        message.reply("Refreshed");
        return;
    }
    if (message.content.toLowerCase() === '~refresh all') {
        if (message.member.roles.has(guild.roles.find("name", "Moderator"))) {
            return;
        }
        for (member in message.guild.members) {
            functions.refreshUser(member.user)
        }
        message.reply("Refreshed");
        return;
    }

    if (message.content.toLowerCase().startsWith('~ping ')) {
        try {
            var exec = require('child_process').exec;

            function puts(error, stdout, stderr) {
                message.channel.sendMessage(stdout);
            }
            exec("ping -n 4 " + message.content.substring(5), puts);
        } catch (e) {
            message.channel.sendMessage("*Sorry this function is not avialable at the moment*");
        }

        return;
    }

    if (message.content.toLowerCase() === '~help') {
        message.reply("I am REVIVE BOT. Here are my commands" +
            "\n ```fix" +
            "\n ~ping - returns a pong" +
            "\n ~yo - returns yo bro" +
            "\n ~ping hostname - pings the hostname" +
            "\n ~bf2 PlayerName - returns bf2 player profile" +
            "\n ~bf2142 PlayerName - returns bf2142 player profile" +
            "\n ~help - displays help" +
            "\n ~restart - restarts the bot" +
            "\n ~start - starts the bot"+
            "\n ~stops - stops the bot"+
            "\n ~link - links your discord account with your battlelo.co account" +
            "\n ~cookie - eats a cookie"+
            "\n add PlayerName to roleName - adds a player to a role"+
            "\n remove PlayerName from roleName - remove a player to a role"+
            "\n ~count int - counts from int to 0 and returns boom"+
            "\n ```");
        return;
    }


    if (message.content.toLowerCase().startsWith('~bf2 ')) {
        var nick = message.content.split(" ")[1].trim();
        var plist = bf2.getPlayers(nick);
        console.log("BF2 in index.js gets executed");
        if (plist == null) {
            message.channel.sendMessage("API Down or too much too many matches");
            return;
        }

        if (plist.length >= 1) {
            //checking for exact matches
            var exact = plist.find(o => o.nick.toUpperCase().trim() === nick.toUpperCase());
            console.log(exact);
            var res = "**S.no.\tName \t PID \t Score**";
            var start = 0;
            var past = 0;
            if (exact != null) {
                res = res + "\n" + (1) + "\t" + "\t" + exact.str();
                start++
            }

            for (var i = start; i < plist.length; i++) {
                if (exact != null && i == plist.indexOf(exact)) {
                    past++;
                    continue;
                }
                if (i == 26) {
                    res = res + "\n" + (plist.length - 25) + " more players found to Get a full list of players \n" +
                        "<https://battlelog.co/player_search.php?q=" + nick + ">";
                    break;
                } else {
                    res = res + " \n" + (i + 1 - past) + "\t" + "\t" + plist[i].str();
                }
            }
            message.channel.sendMessage(res);
        } else if (plist.length == 0) {
            message.channel.sendMessage("Player not found");
        }
    }
    if (message.content.toLowerCase().startsWith('~bf2142 ')) {
        var plist = bf2142.getPlayers(message.content.split(" ")[1]);
        console.log("BF2142 in index.js gets executed");
        if (plist == null) {
            message.channel.sendMessage("API Down");
            return;
        }
        if (plist.length >= 1) {
            var res = "**S.no.\tName \t PID**";
            var start = 0;
            var past = 0;
            if (exact != null) {
                res = res + "\n" + (1) + "\t" + "\t" + exact.str();
                start++;
            }
            for (var i = start; i < plist.length; i++) {
                if (exact != null && i == plist.indexOf(exact)) {
                    past++;
                    continue;
                }
                if (i == 26) {
                    res = res + "\n" + (plist.length - 25) + " more players found to Get a full list of players \n" + "<https://battlelog.co/player_search.php?q=" + nick + ">";
                    break;
                } else {
                    res = res + " \n" + (i + 1 - past) + "\t" + "\t" + plist[i].str();
                }
            }
            message.channel.sendMessage(res);
        } else if (plist.length == 0) {
            message.channel.sendMessage("Player not found");
        }
    }
});
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    bot = require('./bot');
});
bot.on("guildMemberAdd", (member) => {

    var member = member.user;
    member.sendMessage("Welcome to the Revive Nwtowrk");
    functions.integrate(member);
});
/*
setInterval(function() {
    request("GET", "https://revive-bot.herokuapp.com/");
}, 300000); //no sleep script
*/
bot.on('message', message => {
    if (message.content.toLowerCase() === '~stop') {
        if (message.guild != bot.guilds.find("name", "Revive Network Dev")) {
            return;
        };
        process.exit();
    }
});
