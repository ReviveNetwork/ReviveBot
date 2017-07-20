const rp = require('request-promise-native');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    let res = ["Yes", "No", "Maybe"];
    if (message.content.toLowerCase().includes("what") || message.content.toLowerCase().includes("why") || message.content.toLowerCase().includes("did") || message.content.toLowerCase().includes("you"))
        res = "Maybe";
    else
        res = res[Math.floor(Math.random() * res.length)];
    await message.channel.send(res);
    return true;
}
/**
 * description of the command
 */
const description = "Replies to a yes/no question";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    fun: true
};
