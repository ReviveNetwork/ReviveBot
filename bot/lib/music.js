var bot = require('../bot.js');
module.exports = {};
exports = module.exports;
const ytdl = require('ytdl-core');
const streamOptions = {
    seek: 0,
    volume: 0.5
};
let guilds = {};
const Guild = (guild)=>
    {
        let v = guild.channels.filter((guildch) => {
            if (guildch.type === 'voice')
                return guildch;
        }).find((ch) => {
            if (ch.name.toLowerCase().includes("music"))
                return ch;
        });
        let t = guild.channels.filter((guildch) => {
            if (guildch.type === 'text')
                return guildch;
        }).find((ch) => {
            if (ch.name.toLowerCase().includes("music"))
                return ch;
        });
        return {
            voice_channel: v,
            guild: guild.id,
            text_channel: t,
            voice_handler: null,
            voice_connection: null,
            now_playing_data: {},
            queue: [],
            stopped: false,
            inform_np: true
            };
    };
exports.play = function (url, message) {
    let member = message.member;
    if (!url.includes("http")) return;
    if(!guilds[message.guild.id])
        guilds[message.guild.id] = Guild(message.guild);
    console.log("QUEUE size" + guilds[message.guild.id].queue.length);
    /*
    voice_channel = member.voiceChannel;
    text_channel = message.channel;
    if (voice_channel == undefined) {
        member.guild.channels.find(function (channel) {
            if (channel.type === 'text' && channel.name === "music-lobby") return channel;
        }).sendMessage("Join the Music-Lobby");

    } else if (voice_channel.name != "Music-Lobby") {
        voice_channel = member.guild.channels.find(function (channel) {
            if (channel.type === 'voice' && channel.name === "Music-Lobby") return channel;
        });
        member.setVoiceChannel(voice_channel);
    }*/
    member.setVoiceChannel(guilds[message.guild.id].voice_channel).catch(() => {
        message.reply("JOIN A VOICE CHANNEL");
    });
    if (guilds[message.guild.id].text_channel == null)
        guilds[message.guild.id].text_channel = message.channel;
    if (guilds[message.guild.id].queue.length === 0) {
        guilds[message.guild.id].voice_channel.join().then(connection => {
            guilds[message.guild.id].voice_connection = connection;
            add_to_queue(url, message);
        }).catch(console.error);
    } else {
        add_to_queue(url, message);
    }
}
exports.playNext = function (message) {
    if (guilds[message.guild.id].voice_handler !== null) {
        message.reply("Skipping...");
        return guilds[message.guild.id].voice_handler.end();
    } else {
        return play_next_song(guilds[message.guild.id]);
    }
}
exports.clear = function (message) {
    if (!message.member.hasPermission("MOVE_MEMBERS")) {
        message.reply("Not Worthy");
        return;
    }
    guilds[message.guild.id].queue = [];

    if (guilds[message.guild.id].stopped) {
        message.reply("Playback is already stopped!");
    } else {
        if (guilds[message.guild.id].voice_handler !== null) {
            guilds[message.guild.id].voice_handler.end();
            guilds[message.guild.id].voice_connection.disconnect();
        }
        guilds[message.guild.id].stopped = true;
        message.reply("Stopping!");
    }
    return delete guilds[message.guild.id];
}
exports.pause = function (message) {
    if (guilds[message.guild.id].stopped) {
        message.reply("Playback is already paused!");
    } else {
        guilds[message.guild.id].stopped = true;
        if (guilds[message.guild.id].voice_handler !== null) {
            guilds[message.guild.id].voice_handler.end();
        }
        message.reply("pausing!");
    }
}
exports.resume = function (message) {
    if (guilds[message.guild.id].stopped) {
        guilds[message.guild.id].stopped = false;
        if (!is_queue_empty(guilds[message.guild.id])) {
            return play_next_song(guilds[message.guild.id]);
        }
    } else {
        message.reply("Playback is already running");
    }
}
exports.setVol = function (vol, message) {
    if (vol > 1 || vol < 0)
        return message.reply("Invalid Volume. Volume Range(0-1)");
    guilds[message.guild.id].voice_handler.setVolume(vol);
    return message.reply("Volume Has been set");
}
exports.queue = function (message) {
    var response = "";

    if (is_queue_empty(guilds[message.guild.id])) {
        response = "the queue is empty.";
    } else {
        for (var i = 0; i < guilds[message.guild.id].queue.length; i++) {
            response += "<" + guilds[message.guild.id].queue[i]["video"] + "> (requested by "
                + guilds[message.guild.id].queue[i]["user"] + ")\n";
        }
    }
    return message.reply(response);
}

function add_to_queue(url, message) {
    guilds[message.guild.id].queue.push({
        video: url,
        user: message.author.username
    });
    message.reply('added to the queue.');
    if (!guilds[message.guild.id].stopped
        && !is_bot_playing(guilds[message.guild.id])
        && guilds[message.guild.id].queue.length === 1) {
        return play_next_song(guilds[message.guild.id]);
    }
}

function play_next_song(g) {
    if (g.queue.length == 0) {
        g.text_channel.sendMessage("Queue Empty");
        return "Queue Empty";
    }
    var url = g.queue[0]["video"];
    var user = g.queue[0]["user"];

    g.now_playing_data["video"] = url;
    g.now_playing_data["user"] = user;

    if (g.inform_np) {
        g.text_channel.sendMessage('Now playing: <' + url + '> (requested by ' + user + ')');
    }

    var audio_stream = ytdl(url);
    g.voice_handler = g.voice_connection.playStream(audio_stream, streamOptions);

    g.voice_handler.once("end", reason => {
        g.voice_handler = null;
        if (!g.stopped && !is_queue_empty(g)) {
            play_next_song(g);
        } else if (is_queue_empty(g)) {
            g.voice_connection.disconnect();
            delete guilds[g.text_channel.guild.id];
        }
    });

    g.queue.splice(0, 1);
}

function is_queue_empty(g) {
    return g.queue.length === 0;
}

function is_bot_playing(g) {
    return g.voice_handler !== null;
}
