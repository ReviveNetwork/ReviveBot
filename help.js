const bot = require('./bot');

bot.on('message', message => {
	var channel = message.channel;
	message = message.content.toLowerCase();
	if(message.includes('updating') && message.includes('forever') )
	{
		channel.sendMessage('Follow this article \n http://battlelog.co/wiki.php?article=27');
	}
	if(message.includes('unkown dynamicoption'))
		{
		channel.sendMessage('Follow the second part of this article. \n http://battlelog.co/post.php?id=9744');
		}
}
);
