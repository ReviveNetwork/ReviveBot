const refresh = require('./../lib/refresh');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params.length >= 1)
        return message.mentions.users.map(async function(u){
            await refresh(u)
            message.channel.sendMessage(u.toString() + " sucessfully linked");
        });
    else {
        await refresh(message.author);
        return message.channel.sendMessage(message.author.toString() + " sucessfully linked");
    }
}
/**
 * description of the command
 */
const description = "Refreshes your linked account status";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
