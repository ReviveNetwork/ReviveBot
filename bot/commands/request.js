const request = require('request-promise-native');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {

    var msg = params.join(" ");
    if (msg.startsWith('{'))
        msg = JSON.parse(msg)
    message.channel.sendCode('javascript', await request(msg));
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
    description: description
};
