const Discord = require('discord.js');

const client = new Discord.Client();

var dt = process.env.DISCORD_TOKEN || process.argv[2];

if (!dt) {
    console.log('required DISCORD_TOKEN env variable or argument');
}

client.login(dt);

client.on('ready', () => {
    console.log('Discord bot ready... and logged in!');
});

module.exports = client;
