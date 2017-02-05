var bot = require('./bot');
module.exports = {};
exports = module.exports;
queue = [];
const ytdl = require('ytdl-core');
const streamOptions = {
    seek: 0,
    volume: 1
};
var stopped = false;
var inform_np = true;

var now_playing_data = {};
var queue = [];
var voice_connection = null;
var voice_handler = null;
var voice_channel = null;
var text_channel = null;
exports.play = function(URL, message) {
    member = message.member;
    if(!url.includes("youtube.com/"))return;
    console.log("QUEUE size" + queue.length);
    voice_channel = member.voiceChannel;
    text_channel = message.channel;
    if (voice_channel == undefined) {
        member.guild.channels.find(function(channel) {
            if (channel.type === 'text' && channel.name === "music-lobby") return channel;
        }).sendMessage("Join the Music-Lobby");

    } else if (voice_channel.name != "Music-Lobby") {
        voice_channel = member.guild.channels.find(function(channel) {
            if (channel.type === 'voice' && channel.name === "Music-Lobby") return channel;
        });
        member.setVoiceChannel(voice_channel);
    }
    if (queue.length === 0) {
        voice_channel.join().then(connection => {
            voice_connection = connection;
            add_to_queue(url, message);
        }).catch(console.error);
    } else {
        add_to_queue(url, message);
    }
}
exports.playNext = function(message) {
    if (voice_handler !== null) {
        message.reply("Skipping...");
        voice_handler.end();
    } else {
        message.reply("There is nothing being played.");
    }
}
exports.clear = function(message) {
    if (!message.member.hasPermission("MOVE_MEMBERS")) {
        message.reply("Not Worthy");
        return;
    }
    if (stopped) {
        message.reply("Playback is already stopped!");
    } else {
        stopped = true;
        if (voice_handler !== null) {
            voice_handler.end();
            queue = [];
        }
        message.reply("Stopping!");
    }
    voice_handler.disconnect();
}
exports.pause = function(message) {
    if (stopped) {
        message.reply("Playback is already stopped!");
    } else {
        stopped = true;
        if (voice_handler !== null) {
            voice_handler.end();
        }
        message.reply("Stopping!");
    }
}
exports.resume = function(message) {
    if (stopped) {
        stopped = false;
        if (!is_queue_empty()) {
            play_next_song();
        }
    } else {
        message.reply("Playback is already running");
    }
}
exports.setVol = function(vol) {
    voice_handler.setVolume();
}
exports.queue = function(message) {
    var response = "";

    if (is_queue_empty()) {
        response = "the queue is empty.";
    } else {
        for (var i = 0; i < queue.length; i++) {
            response += "<" + queue[i]["video"] + "> (requested by " + queue[i]["user"] + ")\n";
        }
    }

    message.reply(response);
}

function add_to_queue(url, message) {
    queue.push({
        video: url,
        user: message.author.username
    });
    message.reply('added to the queue.');
    if (!stopped && !is_bot_playing() && queue.length === 1) {
        play_next_song();
    }
}

function play_next_song() {
    var url = queue[0]["video"];
    var user = queue[0]["user"];

    now_playing_data["video"] = url;
    now_playing_data["user"] = user;

    if (inform_np) {
        text_channel.sendMessage('Now playing: <' + url + '> (requested by ' + user + ')');
    }

    var audio_stream = ytdl(url);
    voice_handler = voice_connection.playStream(audio_stream);

    voice_handler.once("end", reason => {
        voice_handler = null;
        if (!stopped && !is_queue_empty()) {
            play_next_song();
        }
    });

    queue.splice(0, 1);
}

function is_queue_empty() {
    return queue.length === 0;
}

function is_bot_playing() {
    return voice_handler !== null;
}
