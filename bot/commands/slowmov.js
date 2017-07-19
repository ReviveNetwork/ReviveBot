const settings = require('./../../settings.json');
const request = require('request-promise-native');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
const exec = require('child_process').exec;
async function command(params, message) {
    if (settings.owners.includes(message.author.id)) {
        if (settings.slowmov) {
            settings.slowmov = false;
            message.reply("Slowmov disabled")
        }
        else {
            settings.slowmov = true;
            message.reply("Slowmov enabled")
        }
    }
    else
        message.reply('https://media.tenor.com/images/c472d1ee8c75a50f700bd028cc1b10b9/tenor.gif')
}
/**
 * description of the command
 */
const description = "disables/enables slowmov (owners only)";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    owner: true
};
