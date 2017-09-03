const request = require('request-promise-native');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params.length < 1) {
        await message.reply("Usage:\n~whois <name> - shows what a discord name of revive user is \n(the user should have linked his forum account with his discord account)");
        return false;
    }
    let res = await Promise.all(params.map(async function (name) {
        let body = await request('http://' + (process.env.REVIVE_API || 'localhost') + "/v0/discord/did_from_uname/" + name);
        try {
            body = JSON.parse(body)
        } catch (e) {
            console.log("error: " + body);
        }
        if (body.error)
            return `${name} either does not exist or has not linked his discord account yet.`;
        return name + " has discord id: `" + body.id + "` and is called " + ((bot.users.get(body.id)) ? bot.users.get(body.id).tag : ("<@" + body.id + ">"));
    }));
    res = res.join("\n\r");
    message.reply(res);
    return true;
}

/**
 * description of the command
 */
const description = "Shows discord account name of the revive account mentioned";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    custom: true
};
