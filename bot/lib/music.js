var bot = require('../bot.js');
module.exports = {};
exports = module.exports;
var guilds = {};
const GuildSpawn = require('./../classes/GuildSpawn');
exports.play = function (URL, message) {
    if (!guilds[message.guild.id] || guilds[message.guild.id] == undefined) {
        guilds[message.guild.id] = new GuildSpawn(message.guild);

        guilds[message.guild.id].p.on('message', m => {
            guilds[message.guild.id].p.send("message:test");
            console.log(m);
            if (m.guild === message.guild.id) {
                guilds[message.guild.id].spawnComplete = true;
                guilds[message.guild.id].queue.forEach((mes) => {
                    guilds[message.guild.id].p.send(mes);
                });
            }

        });
        guilds[message.guild.id].p.on('close', () => {
            console.log("child exitted");
            delete guilds[message.guild.id].p;
        });
        guilds[message.guild.id].p.on('exit', () => {
            console.log("child exitted");
            delete guilds[message.guild.id].p;
        });
    }
    let ms = { cmd: 'play', message: URL, user: message.author.id, channel: message.channel.id };
    if (guilds[message.guild.id].spawnComplete)
        return guilds[message.guild.id].p.send(ms);
    else
        return guilds[message.guild.id].queue.push(ms);
}

exports.playNext = function (message) {
    if (!guilds[message.guild.id] || guilds[message.guild.id] == undefined) {
        return message.reply("Queue is empty!");
    }
    let ms = { cmd: 'playnext', message: message.content, user: message.author.id, channel: message.channel.id };
    if (guilds[message.guild.id].spawnComplete)
        return guilds[message.guild.id].p.send(ms);
    else
        return guilds[message.guild.id].queue.push(ms);
}
exports.clear = function (message) {
    if (!guilds[message.guild.id] || guilds[message.guild.id] == undefined) {
        return message.reply("Already Stopped!");
    }
    let ms = { cmd: 'clear', message: message.content, user: message.author.id, channel: message.channel.id };
    if (guilds[message.guild.id].spawnComplete)
        return guilds[message.guild.id].p.send(ms);
    else
        return guilds[message.guild.id].queue.push(ms);
};
exports.resume = function (message) {
    if (!guilds[message.guild.id] || guilds[message.guild.id] == undefined) {
        return message.reply("Nothing is running!");
    }
    let ms = { cmd: 'resume', message: message.content, user: message.author.id, channel: message.channel.id };
    if (guilds[message.guild.id].spawnComplete)
        return guilds[message.guild.id].p.send(ms);
    else
        return guilds[message.guild.id].queue.push(ms);
}
exports.setVol = function (vol, message) {
    if (!guilds[message.guild.id] || guilds[message.guild.id] == undefined) {
        return message.reply("Nothing is running!");
    }
    let ms = { cmd: 'setvol', message: vol, user: message.author.id, channel: message.channel.id };
    if (guilds[message.guild.id].spawnComplete)
        return guilds[message.guild.id].p.send(ms);
    else
        return guilds[message.guild.id].queue.push(ms);
}
exports.queue = function (message) {
    if (!guilds[message.guild.id] || guilds[message.guild.id] == undefined) {
        return message.reply("Nothing is running!");
    }
    let ms = { cmd: 'queue', message: message.content, user: message.author.id, channel: message.channel.id };
    if (guilds[message.guild.id].spawnComplete)
        return guilds[message.guild.id].p.send(ms);
    else
        return guilds[message.guild.id].queue.push(ms);
}
exports.pause = function (message) {
    if (!guilds[message.guild.id] || guilds[message.guild.id] == undefined) {
        return message.reply("Nothing is running!");
    }
    let ms = { cmd: 'pause', message: message.content, user: message.author.id, channel: message.channel.id };
    if (guilds[message.guild.id].spawnComplete)
        return guilds[message.guild.id].p.send(ms);
    else
        return guilds[message.guild.id].queue.push(ms);
}
