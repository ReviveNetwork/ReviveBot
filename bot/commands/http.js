
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    let url = "https://http.cat/" + params.join(' ').trim();

    await message.channel.send('', { file: { attachment: url, name: params[0] + ".png" } });
}
/**
 * description of the command
 */
const description = "Displays http status code";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
