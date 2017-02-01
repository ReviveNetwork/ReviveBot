var bot = require('./bot');
module.exports = {};
exports = module.exports;
queue = [];
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
var playing;
var voiceChannel
exports.play = function(URL,member)
{
	
	console.log("QUEUE size"+queue.length);
	if(queue.length!=0)
	{queue.push([URL,member]);return;}
	voiceChannel = member.voiceChannel;
	if(voiceChannel ==undefined)
	{
		member.guild.channels.find(function(channel)
		{
			if(channel.type==='text' && channel.name ==="music-lobby")return channel;
			}).sendMessage("Join the Music-Lobby");
			
	}
	else if(voiceChannel.name!="Music-Lobby")
	{
		voiceChannel = member.guild.channels.find(function(channel)
		{
			if(channel.type==='voice' && channel.name ==="Music-Lobby")return channel;
		});
		member.setVoiceChannel(voiceChannel);
	}
	console.log(voiceChannel);
	console.log(URL);
	voiceChannel.join()
	.then(connection => {
	const stream = ytdl(URL, {filter : 'audioonly'});
    playing = connection.playStream(stream, streamOptions);
	playing.on('end', (end) => {
				connection.disconnect();
				exports.playNext();
				});
	})
	.catch(console.error);

}
exports.playNext = function()
{
	if(queue.length==0)
	{return;}
	var next = queue.shift();
	exports.play(next[0],next[1]);
}
exports.clear = function(message)
{
	if(! message.member.hasPermission("MOVE_MEMBERS"))
	{message.reply("Not Worthy");return;}
	queue = [];
	playing.end();
	voiceChannel.connection.disconnect();
}
exports.pause = function()
{
	playing.pause();
}
exports.resume = function()
{
	playing.resume();
}
exports.setVol = function(vol)
{
	playing.setVolume(vol);
}
