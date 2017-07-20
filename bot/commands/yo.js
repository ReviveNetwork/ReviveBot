
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    await message.reply('yo bro');
    return true;
}
/**
 * description of the command
 */
const description = "says yo bro";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    fun: true
};
