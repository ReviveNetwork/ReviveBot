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
	if(message.includes('mouse') && message.includes('stuck'))
		{
		channel.sendMessage('follow this article\nhttp://battlelog.co/wiki.php?article=7');
		}
	if(message.includes('invalid') && message.includes('cdkey'))
	{ channel.sendMessage('follow these articles\nhttps://battlelog.co/post.php?id=16014&page=1\nhttp://battlelog.co/wiki.php?article=28');
	}
	if(message.includes('installation') && message.includes('failed'))
	{ 
		channel.sendMessage('follow this article\nhttp://battlelog.co/post.php?id=17435#p57246');
	}	
}
);
