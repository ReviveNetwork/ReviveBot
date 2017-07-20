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
            await message.reply('Invalid Arguments')
            return false;
        }
        if(!access_log)
        {
            await message.reply('access_Log is undefined')
            return false;
        }
        let logs_for_user = access_log.filter(ac => ac.author == user.id);
        if (logs_for_user.length < 1) {
            await message.reply("He hasn't used any bot commands since " + moment(access_log[0].time).fromNow());
        }
        else {
            let res = `${user.toString()} has used ${logs_for_user.length} since ${moment(access_log[0].time).fromNow()}`;
            logs_for_user.map((l) => {
                res = res + "\n" + moment(l.time) + " - ~" + l.command + " " + ((l.sucess) ? "Sucess" : "Failed") + ((l.error) ? " because of error" : "") + ((l.channel) ? ` - <#${l.channel}>` : "")
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
