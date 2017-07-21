const settings = require('./../../settings.json');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    let permissions = message.channel.permissionsFor(message.member);
    if (permissions.has("MANAGE_MESSAGES")) {
        if (!settings["disabled-channels"].includes(message.channel.id)) {
            settings["disabled-channels"].push(message.channel.id);
            message.reply("Disabled fun commands in this channel")
        }
        else {
            let index = settings["disabled-channels"].indexOf(message.channel.id);
            settings["disabled-channels"].splice(index, 1);
            message.reply("Enabled fun commands in this channel")
        }
        return true;
    }
    else {
        await message.reply("You aren't Worthy\nhttps://media.tenor.com/images/c472d1ee8c75a50f700bd028cc1b10b9/tenor.gif")
        return false;
    }
}
/**
 * description of the command
 */
const description = "Disable/enable the bot fun commands in a particular channel";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    mod: true
};

