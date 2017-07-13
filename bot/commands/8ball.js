const rp = require('request-promise-native');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    let url = "https://yesno.wtf/api/";
    if(message.content.toLowerCase().contains("what") || message.content.toLowerCase().contains("why"))
        url = url +"?force=maybe";
    if(message.content.toLowerCase().contains("did") || message.content.toLowerCase().contains("you"))
        url = url +"?force=maybe";
    const r = JSON.parse(await rp(url));

    return await message.channel.send(r.answer, { files: [r.image] });
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
    description: description
};
