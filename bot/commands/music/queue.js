
const music = require('./../../lib/music');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    return music.queue(message);
}
/**
 * description of the command
 */
const description = "Displays the current queue";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
