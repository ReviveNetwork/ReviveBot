
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (message.content.includes(message.client.user.id)) {
        return message.reply("Trying to make me Mute myself?", { files: ["http://is4.mzstatic.com/image/thumb/Purple111/v4/44/0b/36/440b36ab-ceb8-2257-74bb-d39bd71fdb57/source/1200x630bb.jpghttp://is4.mzstatic.com/image/thumb/Purple111/v4/44/0b/36/440b36ab-ceb8-2257-74bb-d39bd71fdb57/source/1200x630bb.jpg"] })
    }
    let permissions = message.channel.permissionsFor(message.member);
    if (permissions.has("MANAGE_MESSAGES")) {
        if (message.mentions.users && message.mentions.users.first()) {
            await Promise.all(message.mentions.users
                .map(u => {
                    message.channel.overwritePermissions(u, { 'SEND_MESSAGES': false }, "Muted");
                }))
            message.reply("Muted " + message.mentions.users.size + " users");
        }
        else
            message.reply("No one to mute");
    }
    else
        message.reply("You aren't Worthy\nhttps://media.tenor.com/images/c472d1ee8c75a50f700bd028cc1b10b9/tenor.gif")
}
/**
 * description of the command
 */
const description = "Mutes a user";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    mod: true
};
