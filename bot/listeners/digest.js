const settings = require('./../../settings.json');
const commands = require('./../commands');
module.exports = message => {
    //Dont listen to Bot messages
    if (message.author.bot) return;
    //Check if bot is locked
    if (settings.lock && !settings.owners.includes(message.author.id)) return;
    //Parse command
    let params = false;
    let cmd = false;
    if (message.content.startsWith(settings.identifier)) {
        /**Extracting params */
        params = message.content.substring(settings.identifier.length).trim();
        params = params.split(settings.delimiter || ' ');
        cmd = params.shift().trim();
    }
    else if (message.isMentioned(message.client.user)) {
        /**Remove mention and extract params */
        params = message.content.split(settings.delimiter || ' ');
        params = params.filter(p => !p.includes(message.client.user.id))
        cmd = params.shift().trim();
    }
    //execute command
    if(cmd)
        commands.execute(cmd.toLowerCase(), params, message)
}
