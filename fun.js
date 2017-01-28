const bot = require('./bot');

bot.on('message',message => {
if(message.content.toLowerCase().startsWith('~count'))
{
   c = parseInt(message.content.split(' ')[1]) || 10;
   count(c,message);
}
});
var count = function(c,message)
{
	if(c<=0)
	{message.edit("Boom");}
	count(c-1,message);
	message.edit(c);
};
