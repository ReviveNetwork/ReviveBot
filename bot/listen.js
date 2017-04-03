const bot = require('./bot.js');
const settings = require('./../settings.json');
const modules = require('./modules.js');
const commands = require('./commands');
let lock = false;
bot.on('error', (err) => {
    /**
     * Catch errors here
     */
    console.log(new Date.now() + " - Error: " + err);
    console.log("Stack Trace: " + err.stack);
})
bot.on('message', (message) => {
    /**
     * if locked, reject everything except dm
     */
    if (lock) {
        if (!settings.owners.includes(message.author.id))
            if (message.channel.guild)
                return;//not DM
    }
    /**
     * Listen to messages and convert into params
     */
    if (message.content.startsWith(settings.identifier)) {
        /**Extracting params */
        let params = message.content.substring(settings.identifier.length).trim();
        params = params.split(settings.delimiter || ' ');
        let cmd = params.shift().trim();
        commands.execute(cmd.toLowerCase(), params, message)
    }
    else if (message.isMentioned(bot.user)) {
        /**remove mentions and then get params */
        let params = message.cleancontent.trim().replace(bot.user.toString(), "").trim();
        params = params.split(settings.delimiter || ' ');
        let cmd = params.shift.trim();
        commands.execute(cmd.toLowerCase(), params, message)
    }
    else {
        //ignore because normal message
    }
});
bot.on('lock', () => { lock = true; });
bot.on('unlock', () => { lock = false; });
bot.on("guildMemberAdd", (member) => {
    var user = member.user;
    if (member.guild.name.toLowerCase().includes('revive')) {
        user.sendMessage("Welcome to the Revive Network");
        refresh(user);
    }
});
bot.on('disconnect', function(event) {
    if (event.code === 0) return console.error(event);
    bot.destroy().then(() => bot.login());
});
