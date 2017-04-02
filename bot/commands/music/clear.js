
const music = require('./../../lib/music');

/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    return music.clear(message);
}
/**
 * description of the command
 */
const description = "clears music queue";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
