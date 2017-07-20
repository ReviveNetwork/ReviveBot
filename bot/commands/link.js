
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    await message.author.send("To link your discord account with your battlelog account follow the link given below\n"
        + "https://battlelog.co/discord_link.php");
    return true;
}
/**
 * description of the command
 */
const description = "Links a discord account with battlelog.co";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    custom: true
};
