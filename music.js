var bot = require('./bot');
module.exports = {};
exports = module.exports;
queue = [];
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
var playing;
exports.play = function(URL,member)
{
	if(queue.size!=0)
	{queue.push([URL,member]);return;}
	var voiceChannel = member.voiceChannel;
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
	voiceChannel.join()
	.then(connection => {
   const stream = ytdl(URL, {filter : 'audioonly'});
    playing = connection.playStream(stream, streamOptions);
	})
	.catch(console.error);
	
	playing.on('end', (err) => {
				exports.playNext();
				});
}
exports.playNext = function()
{
	if(queue.size==0)
	{return;}
	var next = queue.shift();
	exports.play(next[0],next[1]);
}
exports.clear = function(message)
{
	if(! member.hasPermission("MOVE_MEMBERS"))
	{message.reply("Not Worthy");return;}
	queue = [];
	playing.end();
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