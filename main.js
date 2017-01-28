var bot = require('./bot');
start();
bot.on('message',message =>
	{
var guild = bot.guilds.find("name","Revive Network Dev");
if(message.guild != guild)
{return;}
if(message.content.toLowerCase()==='~restart')
{
	message.channel.sendMessage('~stop');
	start();
message.reply('restarted');
}
if(message.content.toLowerCase()==='~start')
{
	start();
	message.reply('started');
}

	});
function start(){
	console.log('Starting?');
	const exec = require('child_process').exec;
	exec('node index.js', (error, stdout, stderr) => {
		  if (error) {
			  console.log("error");
			      start; return;
			    }
		  console.log(`stdout: ${stdout}`);
		  console.log(`stderr: ${stderr}`);
		});
};
