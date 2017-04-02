const Discord = require('discord.js');
const settings = require('./../settings.json');
const client = new Discord.Client();

var dt = process.env.DISCORD_TOKEN || settings.token;

if (!dt) {
    console.log('required DISCORD_TOKEN env variable or argument');
}

client.login(dt);

client.on('error', e => {
    console.error(e);
});

module.exports = client;