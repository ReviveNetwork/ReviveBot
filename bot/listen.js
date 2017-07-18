const refresh = require('./lib/refresh');
const bot = require('./bot.js');
const settings = require('./../settings.json');
const modules = require('./modules.js');
const Message = require('./../orm/Message')
const commands = require('./commands');
const request = require('request-promise-native');
const influx = require('./../influx');
let lock = false;
let ready = false;
bot.on('error', (err) => {
    /**
     * Catch errors here
     */
    console.log("Stack Trace: " + err.stack);
})
process.on('unhandledRejection', (err) => {
    console.log("UNHANDLED REJECTION AT " + err.stack);
    if (err.toString().includes('Request to use token, but token was unavailable to the client'))
        process.exit();//restart
});
process.on('uncaughtException', (err) => console.log("UNHANDLED EXCEPTION AT " + err.stack));
bot.on('message', async function (message) {
    /**
     * if locked, reject everything except dm
     */
    new Message({
        messageID: message.id,
        channel: message.channel.id
    }).save();
    if (lock) {
        if (!settings.owners.includes(message.author.id))
            //  if (message.channel.guild)
            return;//not DM
    }
    /**
     * Listen to messages and convert into params
     */
    if (message.member && message.member != null) {
        let muted = message.member.roles.find(function (r) {
            if (r.name.toLowerCase().includes('mute') && !r.name.toLowerCase().includes('non') && !r.name.toLowerCase().includes('test')) return r
        })
        if (muted && message.deletable)
            message.delete();
    }
    if (message.author.bot) return;
    if (settings.slowmov && message.channel.deletable && message.member.bannable)
        setTimeout(() => {
            if (message.member.lastMessage && message.member.lastMessage.createdTimestamp > Date.now()- 2000) {
                message.channel.overwritePermissions(message.author, { 'SEND_MESSAGES': false }, "Muted");
                message.reply("Calm down")

                setTimeout(() => {
                    let p = message.channel.permissionOverwrites.get(message.author.id);
                    if (p)
                        p.delete();
                }, 2000)
            }
        }, 2000)

    if (message.content.startsWith(settings.identifier)) {
        /**Extracting params */
        let params = message.content.substring(settings.identifier.length).trim();
        params = params.split(settings.delimiter || ' ');
        let cmd = params.shift().trim();
        commands.execute(cmd.toLowerCase(), params, message)
    }
    else {
        //ignore because normal message
    }
});
bot.on('lock', () => { lock = true; });
bot.on('unlock', () => { lock = false; });
bot.on("guildMemberAdd", async function (member) {
    var user = member.user;
    if (member.guild.id === "184536578654339072") {
        if (member.user.bot) return console.log(member.user.tag + " is a bot who joined " + member.guild.name)
        if (refresh(user, true)) {
            user.send("Welcome to the Revive Network\nBecome a verified member and get exclusive benefits by linking your discord account with your Revive account\nTo link, please follow this link\nhttps://battlelog.co/discord_link.php");
        }
    }
});
bot.on("guildMemberRemove", async function (member) {
    var user = member.user;
});
/**
bot.on('disconnect', function(event) {
    if (event.code === 0) return console.error(event);
    process.exit();//force restart
});*/

bot.on('ready', async function () {
    console.log("ReviveBot Ready");
    console.log(process.versions);
    let dbs = await influx.getDatabaseNames();
    console.log(dbs);
    if (!dbs || dbs === null)
        console.log("Cant connect to influx")
    if (!dbs.includes('discord')) {
        console.log("Creating Dicord DB");
    }
    ready = true;
});
bot.on("guildMemberUpdate", async function (member, newMem) {
    let user = member.user;
    if (member.guild && (member.guild.id === "184536578654339072")) {
        let oldMem = member;
        if (!oldMem.roles.has("273105185566359562") && newMem.roles.has("273105185566359562")) return;
        if (!oldMem.roles.has("275317218911322112") && newMem.roles.has("275317218911322112")) return;
        if ((!oldMem.roles.has("184684916833779712") && newMem.roles.has("184684916833779712")) || (!oldMem.roles.has("200849956796497920") && newMem.roles.has("200849956796497920")) || (!oldMem.roles.has("184676864630063104") && newMem.roles.has("184676864630063104")) || (!oldMem.roles.has("286646245198528523") && newMem.roles.has("286646245198528523"))) {
            await request({ uri: 'http://localhost/v0/discord/reverse_link/' + user.id, method: "POST" });
        }
    }
});
setInterval(async function () {
    if (!ready) return;
    const guild = bot.guilds.get("184536578654339072");
    influx.writePoints([
        {
            measurement: 'statistics',
            fields: { count: guild.memberCount },
            tags: { type: 'members' }
        }
    ]).catch(console.log);
    let count = await Message.count();
    if (count)
        influx.writePoints([
            {
                measurement: 'statistics',
                fields: { count: count },
                tags: { type: 'messages' }
            }
        ]).catch(console.log);
    guild.roles.map(r => {
        influx.writePoints([
            {
                measurement: 'statistics',
                fields: { count: r.members.size },
                tags: { type: r.id }
            }
        ]).catch(console.log);
    });
    influx.writePoints([
        {
            measurement: 'statistics',
            fields: { count: guild.presences.filter(p => p.status != 'offline').size },
            tags: { type: "online" }
        }
    ]).catch(console.log);
}, 1000)
