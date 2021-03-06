const request = require('request-promise-native');
const settings = require('./../../settings.json');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (!settings.owners.includes(message.author.id)) {
        await message.reply('https://media.tenor.com/images/c472d1ee8c75a50f700bd028cc1b10b9/tenor.gif');
        return false;
    }
    var msg = params.join(" ");
    if (msg.startsWith('{'))
        msg = JSON.parse(msg)
    await message.channel.send(await request(msg), { code: 'javascript' });
}
/**
 * description of the command
 */
const description = "executes a http request";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    owner: true
};
