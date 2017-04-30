const refresh = require('./../lib/refresh');
const settings = require('./../../settings.json');
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
                await message.channel.sendMessage(u.toString() + " sucessfully linked");
            else
                await message.channel.sendMessage(u.toString() + " unable to be linked");
        });
        if (!settings.owners.includes(message.author.id)) return;
        message.mentions.roles.map(function(r){
            console.log("Linking everyone in "+r.name);
            r.members.map(async function(m){
                let u = m.user;
                console.log("refreshing "+u.username);
                if( await refresh(u,true) )
                    await message.channel.sendMessage(u.toString() + " sucessfully linked");
                else
                    await message.channel.sendMessage(u.toString() + " unable to be linked");
            })
        });
        return true;
    }
    else {
        if(await refresh(message.author))
            return await message.channel.sendMessage(message.author.toString() + " sucessfully linked")
        else
            return await message.channel.sendMessage(message.author.toString() + " unable to be linked");
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
