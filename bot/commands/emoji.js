
const bot = require('./../bot');
const nemoji = require('node-emoji');
const request = require('request-promise-native')
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params[0]) {
        if (/\<\:.+\:\d+\>/.test(params[0])) {
            let url = `https://cdn.discordapp.com/emojis/${params[0].match(/(\d+)/)[1]}.png`;
            message.channel.send('', { file: url });
        } else {
            let em = await request({
                uri: 'https://api.github.com/emojis',
                headers: {
                    'User-Agent': 'Revive-Bot'
                }
            });
            em = JSON.parse(em);
            let url = em[params[0]];
            if (url)
                message.channel.send('', { file: url });
            else
                message.channel.sendMessage('Invalid emoji');
        }
    } else
        message.channel.sendMessage('Not enough arguments!');

}
/**
 * description of the command
 */
const description = "Gets url of the emoji";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
