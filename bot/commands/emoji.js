
const bot = require('./../bot');
const nemoji = require('node-emoji');
const request = require('request-promise-native');
const e = require('./../../data/emoji.json');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params.length > 0) {
        let em = await request({
            uri: 'https://api.github.com/emojis',
            headers: {
                'User-Agent': 'Revive-Bot'
            }
        });
        em = JSON.parse(em);
        const files = [];
        for (let i = 0; i < params.length; i++) {
            if (/\<\:.+\:\d+\>/.test(params[i])) {
                files.push({ attachment: `https://cdn.discordapp.com/emojis/${params[i].match(/(\d+)(?!.*\d)/)[1]}.png`, name: "emoji.png" });

            } else {
                let url = em[params[i]]
                if (!url) {
                    url = e[params[i]];
                    if (url)
                        url = em[url];
                }
                if (url)
                    files.push({ attachment: url, name: params[i] + ".png" });
            }
        }
        if (files.length === 0)
            return await message.channel.send("Invalid Emoji");
        else
            return await message.channel.send((files.length > 1) ? ('Emojis') : (""), { files: files });
    } else
        return await message.channel.send('Not enough arguments!');

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
