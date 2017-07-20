
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    await message.reply('hi');
    return true
}
/**
 * description of the command
 */
const description = "says hi";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    fun: true
};
