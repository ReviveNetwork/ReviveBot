const settings = require('./../../settings.json');
const influx = require('./../../influx');
const knex = require('./../../knex');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
  if (!settings.owners.includes(message.author.id)) {
    await message.reply('https://media.tenor.com/images/c472d1ee8c75a50f700bd028cc1b10b9/tenor.gif');
    return false
  }
  let type = params.shift().toLowerCase();
  if (type === 'influx') {
    let res = await influx.query(params.join(' '));
    await message.channel.send(JSON.stringify(res), { code: 'js', split: true });
  }
  else if (type === 'sql') {
    let res = await knex.raw(params.join(' '));
    await message.channel.send(JSON.stringify(res), { code: 'js', split: true });
  }
  else
    await message.reply("INVALID TYPE OF QUERY");
  return true;
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
  description: description,
  owner: true
};
