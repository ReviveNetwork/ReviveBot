
const bot = require('./../bot');
const nemoji = require('node-emoji');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    let res = "";
    for (let i = 0; i < params.length; i++) {
        let emoji = nemoji.search(params[i]).shift();
        console.log(emoji);
        if (!emoji)
            emoji = bot.emojis.find('name', ":" + params[i] + ":");
        else
            emoji = emoji.emoji;
        if (emoji && emoji != null)
            res = res + " " + emoji.toString();
        else
            res = res + " " + params[i];
    }
    message.channel.send(res);
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
