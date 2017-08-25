const bot = require('./../bot');
const settings = require('./../../settings.json');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send("You aren't Worthy\nhttps://media.tenor.com/images/c472d1ee8c75a50f700bd028cc1b10b9/tenor.gif").then(m => m.delete(10000));
        return false;
    }
    await message.delete(10000);
    let user = null;
    let channel = message.channel;
    let limit = 10;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
        params = params.filter(function (p) {
            if (!p.includes(user.id))
                return p;
        })
    }
    if (message.mentions.channels.first()) {
        channel = message.mentions.channels.first();
        params = params.filter(function (p) {
            if (!p.includes(channel.id))
                return p;
        })
    }
    if (params[0] && !isNaN(parseInt(params[0])))
        limit = parseInt(params[0]);
    if (limit > 100) {
        if (!settings.owners.includes(message.author.id)) {
            await message.channel.send("Too many messages to delete. Max messages that i can delete at once is 100").then(m => m.delete(10000));
            return false;
        }
        else {
            let num = await recursiveDelete(message.channel, limit);
            await message.channel.send("Deleted " + num + " messages").then(m => m.delete(10000));
            return true;
        }
    }
    let messages = await channel.fetchMessages({ limit: limit });
    if (messages.size < 2) {
        await message.channel.send("Deleted 0 messages").then(m => m.delete(10000));
        return true;
    }
    if (user === null) {
        await channel.bulkDelete(limit);
        await message.channel.send("Deleted " + messages.size + " messages").then(m => m.delete(10000));
        return true
    }
    else {
        messages = await messages.filter(function (m) {
            if (m.author.id === user.id)
                return m;
        });
        if (messages.size < 2) {
            await message.channel.send("Deleted 0 messages").then(m => m.delete(10000));
            return true;
        }
        await channel.bulkDelete(messages);
        await message.channel.send("Deleted " + messages.size + " messages").then(m => m.delete(10000));
        return true;
    }
}
/**
 * description of the command
 */
const description = "delete mutltiple messages from a channel.";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    mod: true
};

async function recursiveDelete(channel, limit) {
    if (limit > 100) {
        await channel.bulkDelete(100);
        limit -= 100;
        let num = await recursiveDelete(channel, limit);
        return num + 100;
    }
    else if (limit > 2) {
        await channel.bulkDelete(limit);
        return limit;
    }
    else
        return 0;
}