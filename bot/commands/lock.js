const settings = require('./../../settings.json');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (settings.owners[message.author]) {
        message.client.emit('lock');
        message.reply('Locked the bot');
    }
    else
        message.reply('Not worthy')
}
/**
 * description of the command
 */
const description = "locks the bot";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
