
const music = require('./../../lib/music');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    return music.pause(message);
}
/**
 * description of the command
 */
const description = "Pauses the music";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
