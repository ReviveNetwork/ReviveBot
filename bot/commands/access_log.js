const settings = require('./../../settings.json');
const moment = require('moment');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (settings.owners.includes(message.author.id)) {
        const access_log = require('./../commands').access_log;
        let user = message.mentions.users.first();
        if (!user || user == null) {
            let logs_for_channel = access_log.filter(ac => ac.channel == message.channel.id);
            logs_for_channel.reverse()
            let res = `${logs_for_channel.length} have been used in #${message.channel.name} since ${moment(access_log[0].time).fromNow()}. Showing last 50 usages`;
            logs_for_channel.slice(0,50).map((l) => {
                res = res + `\n ${moment(l.time).fromNow()} - ~${l.command} by ${(message.client.users.get(l.author)?message.client.users.get(l.author).tag:"<@"+l.author+">")} ` + ((l.success) ? "Success" : "Failed") + ((l.error) ? " because of error" : "") + ((l.channel) ? ` - ${message.client.channels.get(l.channel).name}` : "")
            })
            await message.channel.send(res, { split: true, code: 'xl' });
            return true;
        }
        if (!access_log) {
            await message.reply('access_Log is undefined')
            return false;
        }
        let logs_for_user = access_log.filter(ac => ac.author == user.id);
        logs_for_user.reverse()
        if (logs_for_user.length < 1) {
            await message.reply("He hasn't used any bot commands since " + moment(access_log[0].time).fromNow());
        }
        else {
            let res = `${user.tag} has used ${logs_for_user.length} since ${moment(access_log[0].time).fromNow()}. Showing last 50 usages`;
            logs_for_user.slice(0, 50).map((l) => {
                res = res + "\n" + moment(l.time).fromNow() + " - ~" + l.command + " " + ((l.success) ? "Success" : "Failed") + ((l.error) ? " because of error" : "") + ((l.channel) ? ` - ${message.client.channels.get(l.channel).name}` : "")
            })
            await message.channel.send(res, { split: true, code: 'xl' });
        }
        return true;
    }
    else {
        await message.reply('https://media.tenor.com/images/c472d1ee8c75a50f700bd028cc1b10b9/tenor.gif')
        return false;
    }
}
/**
 * description of the command
 */
const description = "Shows access log for a user";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    owner: true
};
