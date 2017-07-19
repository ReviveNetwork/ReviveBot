
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    message.reply('crunch crunch. That was yum!');
}
/**
 * description of the command
 */
const description = "eats a cookie";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    fun: true
};
