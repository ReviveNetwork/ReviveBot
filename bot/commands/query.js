const settings = require('./../../settings.json');
const influx = require('./../../influx');
const knex = require('./../../knex');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (settings.owners.includes(message.author.id)) {
        let type = params.shift().toLowerCase();
        if(type === 'influx')
        {
          let res = await influx.query(params.join(' '));
          return await message.channel.send(JSON.stringify(res),{code:'js',split:true});
        }
        else if(type === 'sql')
        {
          let res = await knex.raw(params.join(' '));
          return await message.channel.send(JSON.stringify(res),{code:'js',split:true});
        }
        else
          return await message.reply("INVALID TYPE OF QUERY");
    }
    else
        return await message.reply('Not worthy');
}
/**
 * description of the command
 */
const description = "Execute a query (owners only)";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
