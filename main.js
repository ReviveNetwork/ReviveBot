var bot = require('./bot');
const fork = require('child_process').fork;

const config = require('./config');

var bot_process = false;

/*
    These functions are bootstrapping the bot process
    so we can manage it with a parent process
    cool, i guess...
*/

function bot_start() {

    if (bot_process !== false) {
        console.log('Bot process already started...');
        return;
    }

    var dt = process.env.DISCORD_TOKEN || process.argv[2];
    bot_process = fork(require('path').join(__dirname, 'index.js'), [process.argv[2]], { silent: true });
    bot_process.on('exit', (code, signal) => {
        console.log('BOT EXIT');
        bot.channels.get(config.log_channel).sendMessage('ReviveBot: EXIT (pid: ' + bot_process.pid + ', code: ' + code + ' signal: ' + signal + ')');
        bot_process = false;
    })

    bot.channels.get(config.log_channel).sendMessage('ReviveBot: RUNNING (pid: ' + bot_process.pid + ')');

    bot_process.stderr.on('data', (data) => {
        console.error(data.toString());
        bot.channels.get(config.log_channel).sendMessage('**ERROR** ReviveBot-' + bot_process.pid + ' ```' + data + '```');
    });

    bot_process.stdout.on('data', (data) => {
        console.log(data.toString());
        bot.channels.get(config.log_channel).sendMessage('**LOG** ReviveBot-' + bot_process.pid + ' ```' + data + '```');
    });

    return bot_process;
};

function bot_stop() {
    if (bot_process) {
        bot_process.kill();
        bot_process = false;
    }
}

/*
    Initialize our bot bootstrapper
    listen for restart/stop here
*/

bot.on('ready', () => {
    bot_start();
    bot.channels.get(config.log_channel).sendMessage('BOOTSTRAP: Ready (pid: ' + process.pid + ')');

})

bot.on('message', message => {
    var guild = bot.guilds.find("name", "Revive Network Dev");

    if (message.guild != guild) {
        return;
    }

    var msg = message.content.toLowerCase();

    if (msg == "~stop") {
        if (bot_process) message.reply(':| Stoping (pid: ' + bot_process.pid + ')');
        else return message.reply(':| Bot not running!')
        bot_stop();
    } else if (msg == '~restart') {
        bot_stop();
        bot_start();
        message.reply(':) Restarted Process!');
    } else if (msg == '~status') {
        if (bot_process) message.reply(':) (pid: ' + bot_process.pid + ')');
        else message.reply(':( rip');
    } else if (msg === '~start') {
        if (bot_process !== false) return message.reply('Bot already started >:(');
        else message.reply('Starting Bot...')
        bot_start();
        if (bot_process) message.reply(':) Started Bot (pid: ' + bot_process.pid + ')');
        else message.reply(':( Bot start error!')
    }

});
