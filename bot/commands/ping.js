
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    let m = await message.reply('Pong. The heartbeat ping to discord is '+message.client.ping+" ms");
    m.edit(m.content+"\nThe time taken for me to respond to your message is "+ (m.createdTimestamp - message.createdTimestamp)+" ms");
}
/**
 * description of the command
 */
const description = "plays ping pong";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    fun: true
};
