module.exports = (channel,text) =>
{
	while(text.length>2000)
	{
		channel.sendMessage(text.substring(0,2000));
		text = text.substring(2000);
	}
}
