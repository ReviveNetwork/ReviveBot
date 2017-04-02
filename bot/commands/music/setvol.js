
const music = require('./../../lib/music');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    music.setVol(params[0], message);
}
/**
 * description of the command
 */
const description = "sets play volume. Valid volumes 0-1";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
