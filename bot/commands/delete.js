const bot = require('./../bot');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send("You aren't Worthy");
        return;
    }
    let user = null;
    let channel = message.channel;
    let limit = 10;
    if(message.mentions.users.first())
    {
        user = message.mentions.users.first();
        params = params.filter(function(p){
            if(!p.includes(user.id))
                return p;
        })
    }
    if(message.mentions.channels.first())
    {
        channel = message.mentions.channels.first();
        params = params.filter(function(p){
            if(!p.includes(channel.id))
                return p;
        })
    }
    if(params[0] && !isNaN(parseInt(params[0])) )
      limit = parseInt(params[0]);
    let messages = await channel.fetchMessages({limit:limit});
    if(user ===null)
      return await channel.bulkDelete(limit);
    else
    {
      return await channel.bulkDelete(await messages.filter(function(m){
        if(m.author.id === user.id)
          return m;
      }));
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
    description: description
};
