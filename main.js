var bot = require('./bot');
const spawn = require('child_process').spawn;
const commands = require('./commands');
const config = require('./config');
var pm2 = false;

/*
    These functions are bootstrapping the bot process
    so we can manage it with a parent process
    cool, i guess...
*/

function startlog() {

    if (pm2 !== false) {
        console.log('Bot process already started...');
        return;
    }
	start = false;

    pm2 = spawn('pm2', ['logs','--raw']);
    pm2.on('exit', (code, signal) => {
        console.log('PM2 EXIT');
    })

    pm2.stderr.on('data', (data) => {
        console.error(data.toString());
        bot.channels.get(config.log_channel).sendMessage(' ```' + data.toString().substring(0,1900)+ '```');
    });

    pm2.stdout.on('data', (data) => {
        console.log(data.toString());
        bot.channels.get(config.log_channel).sendMessage( ' ```' +data.toString().substring(0,1900) + '```');
    });

    return pm2;
};

/*
    Initialize our bot bootstrapper
    listen for restart/stop here
*/

bot.on('ready', () => {
	startlog();
    bot.channels.get(config.log_channel).sendMessage('BOOTSTRAP: Ready (pid: ' + process.pid + ')');
})

bot.on('message', message => {
	if(message.author.bot)return;
    var guild = bot.guilds.get('256299642180861953');

    if (message.guild != guild) {
        return;
    }
    if(! message.member.roles.find('name','dev'))return;
    var msg = message.content.toLowerCase();

    if (msg == '~restart') {
	bot.channels.get(config.log_channel).sendMessage('Exiting with code 0');
        process.exit();
        }
	else if (msg == '~status') {
        message.reply(':) (pid: ' + process.pid + ')');
    } else if (msg.startsWith('~cmd')) {
       const exec = require('child_process').exec;
        exec(msg.substring(5), (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            bot.channels.get(config.log_channel).sendMessage('**ERROR** Shell-' + ' ```' + error + '```\n`'+stderr+'`');
            return;
        }
        console.log(`stdout: ${stdout}`);
        bot.channels.get(config.log_channel).sendMessage('**LOG** Shell-' + ' ```' + stdout + '```');
        console.log(`stderr: ${stderr}`);
        });
    }
});
process.on('exit', (code) => {
	  console.log(`About to exit with code: ${code}`);
	});
