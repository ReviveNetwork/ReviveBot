const refresh = require('./../lib/refresh');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params.length >= 1)
    {
        message.mentions.users.map(async function(u){
            if( await refresh(u) )
                message.channel.sendMessage(u.toString() + " sucessfully linked");
            else
                message.channel.sendMessage(u.toString() + " unable to be linked");
        });
        message.mentions.roles.map(function(r){
            r.members.map(async function(m){
                let u = m.user;
                if( await refresh(u,true) )
                    message.channel.sendMessage(u.toString() + " sucessfully linked");
                else
                    message.channel.sendMessage(u.toString() + " unable to be linked");
            })
        });
        return true;
    }
    else {
        if(await refresh(message.author))
            return message.channel.sendMessage(message.author.toString() + " sucessfully linked")
        else
            return message.channel.sendMessage(message.author.toString() + " unable to be linked");
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
