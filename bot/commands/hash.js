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
        message.channel.sendMessage('Invalid algorithm \n Valid hashing Algorithms are:\n' + crypto.getHashes().join(' , '));
        return;
    }
    res = checksum(res, algo);
    console.log(res); message.channel.sendMessage('hash of message:' + res);
    if (message.attachments.size > 0) {
        res = message.attachments.first().url;
        request(res).then(body => message.channel.sendMessage('Hash of file:\n' + checksum(body, algo)));
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
    description: description
};
