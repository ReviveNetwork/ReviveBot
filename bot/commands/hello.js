
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    message.reply('hi');
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
    description: description
};
