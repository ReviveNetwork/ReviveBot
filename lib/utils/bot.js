const Discord = require('discord.js');

const client = new Discord.Client();

var dt = process.argv[2] || process.env.DISCORD_TOKEN;

if (!dt) {
    console.log('required DISCORD_TOKEN env variable or argument');
}

client.login(dt);

client.on('error', e => {
    console.error(e);
});

module.exports = client;
