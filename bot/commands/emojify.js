
const bot = require('./../bot');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    let res = "";
    for (let i = 0; i < params.length; i++) {
        let emoji = bot.emojis.find('name', params[i]);
        if (emoji)
            res = res + " " + emoji.toString();
        else
            res = params[i];
    }
    message.channel.sendMessage(res);
}
/**
 * description of the command
 */
const description = "Converts text to emoji";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
