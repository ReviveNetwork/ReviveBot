//const refresh = require('./../lib/refresh');
const settings = require('./../../settings.json');
const request = require('request-promise-native');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params.length >= 1) {
        message.mentions.users.map(async function (u) {
            const r = await request('http://revive-bot-discord.revive.systems/v0/discord/reverse_link/' + u.id)
            if (r == "ok")
                await message.channel.sendMessage(u.toString() + " sucessfully linked");
            else
                await message.channel.sendMessage(u.toString() + " unable to be linked");
        });
        if (!settings.owners.includes(message.author.id)) return;
        message.mentions.roles.map(function (r) {
            console.log("Linking everyone in " + r.name);
            r.members.map(async function (m) {
                let u = m.user;
                console.log("refreshing " + u.username);
                const r = await request('http://revive-bot-discord.revive.systems/v0/discord/reverse_link/' + u.id)
                if (r == "ok")
                    await message.channel.sendMessage(u.toString() + " sucessfully linked");
                else
                    await message.channel.sendMessage(u.toString() + " unable to be linked");
            })
        });
        return true;
    }
    else {
        const r = await request('http://revive-bot-discord.revive.systems/v0/discord/reverse_link/' + message.author.id)
        if (r == "ok")
            await message.channel.sendMessage(u.toString() + " sucessfully linked");
        else
            await message.channel.sendMessage(u.toString() + " unable to be linked");
    }
}
/**
 * description of the command
 */
const description = "Refreshes your linked account status";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
