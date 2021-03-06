const checksum = require('./../lib/checksum');
const settings = require('./../../settings.json');
const crypto = require('crypto');
const request = require('request-promise-native');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    let algo = params.shift();
    let res = params.join(settings.delimiter || ' ');
    if (crypto.getHashes().indexOf(algo) === -1) {
        await message.channel.send('Invalid algorithm \n Valid hashing Algorithms are:\n' + crypto.getHashes().join(' , '));
        return false;
    }
    res = checksum(res, algo);
    console.log(res); message.channel.send('hash of message: ' + res);
    if (message.attachments.size > 0) {
        res = message.attachments.first().url;
        let body = await request(res);
        await message.channel.send('Hash of file: ' + checksum(body, algo));
        return true;
    }
}
/**
 * description of the command
 */
const description = "calculates checksum of given hash";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    fun: true
};
