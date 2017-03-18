var bot = require('../utils/bot');
module.exports = {};
exports = module.exports;
const ytdl = require('ytdl-core');
const streamOptions = {
    seek: 0,
    volume: 0.5
};
var guilds = {
};
bot.on('ready', () => {
    bot.guilds.foreach((guild) => {
        let v = guild.channels.filter((guildch) => {
            if (guildch.type === 'voice')
                return guildch;
        }).find((ch) => {
            if (ch.toLowerCase().includes("music"))
                return ch;
        });
        let t = guild.channels.filter((guildch) => {
            if (guildch.type === 'text')
                return guildch;
        }).find((ch) => {
            if (ch.toLowerCase().includes("music"))
                return ch;
        });
        guilds[guild.id] = {
            voice_channel: v,
            text_channel: t,
            voice_handler: null,
            voice_connection: null,
            now_playing_data: {},
            queue: [],
            stopped: false,
            inform_np: true
        }
    });
})
exports.play = function (URL, message) {
    let member = message.member;
    if (!url.includes("http")) return;
    console.log("QUEUE size" + guilds[message.guild].queue.length);
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
    member.setVoiceChannel(guilds[message.guild].voice_channel).catch(() => {
        message.reply("JOIN A VOICE CHANNEL");
    });
    if (guilds[message.guild].queue.length === 0) {
        guilds[message.guild].voice_channel.join().then(connection => {
            guilds[message.guild].voice_connection = connection;
            add_to_queue(url, message);
        }).catch(console.error);
    } else {
        add_to_queue(url, message);
    }
}
exports.playNext = function (message) {
    if (guilds[message.guild].voice_handler !== null) {
        message.reply("Skipping...");
        guilds[message.guild].voice_handler.end();
    } else {
        play_next_song(guilds[message.guild]);
    }
}
exports.clear = function (message) {
    if (!message.member.hasPermission("MOVE_MEMBERS")) {
        message.reply("Not Worthy");
        return;
    }
    guilds[message.guild].queue = [];

    if (guilds[message.guild].stopped) {
        message.reply("Playback is already stopped!");
    } else {
        if (guilds[message.guild].voice_handler !== null) {
            guilds[message.guild].voice_handler.end();
            guilds[message.guild].voice_connection.disconnect();
        }
        guilds[message.guild].stopped = true;
        message.reply("Stopping!");
    }
    guilds[message.guild].voice_connection.disconnect();
}
exports.pause = function (message) {
    if (guilds[message.guild].stopped) {
        message.reply("Playback is already paused!");
    } else {
        guilds[message.guild].stopped = true;
        if (guilds[message.guild].voice_handler !== null) {
            guilds[message.guild].voice_handler.end();
        }
        message.reply("pausing!");
    }
}
exports.resume = function (message) {
    if (guilds[message.guild].stopped) {
        guilds[message.guild].stopped = false;
        if (!is_queue_empty(guilds[message.guild])) {
            play_next_song(guilds[message.guild]);
        }
    } else {
        message.reply("Playback is already running");
    }
}
exports.setVol = function (vol, message) {
    if (vol > 1 || vol < 0)
        return "Invalid Volume. Volume Range(0-1)";
    guilds[message.guild].voice_handler.setVolume(vol);
    return "Volume Has been set"
}
exports.queue = function (message) {
    var response = "";

    if (is_queue_empty(guilds[message.guild])) {
        response = "the queue is empty.";
    } else {
        for (var i = 0; i < guilds[message.guild].queue.length; i++) {
            response += "<" + guilds[message.guild].queue[i]["video"] + "> (requested by "
                + guilds[message.guild].queue[i]["user"] + ")\n";
        }
    }
    message.reply(response);
}

function add_to_queue(url, message) {
    guilds[message.guild].queue.push({
        video: url,
        user: message.author.username
    });
    message.reply('added to the queue.');
    if (!guilds[message.guild].stopped
        && !is_bot_playing(guilds[message.guild])
        && guilds[message.guild].queue.length === 1) {
        play_next_song(guilds[message.guild]);
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
bot.on('guildCreate', (guild) => {
    let v = guild.channels.filter((guildch) => {
        if (guildch.type === 'voice')
            return guildch;
    }).find((ch) => {
        if (ch.toLowerCase().includes("music"))
            return ch;
    });
    let t = guild.channels.filter((guildch) => {
        if (guildch.type === 'text')
            return guildch;
    }).find((ch) => {
        if (ch.toLowerCase().includes("music"))
            return ch;
    });
    guilds[guild.id] = {
        voice_channel: v,
        text_channel: t,
        voice_handler: null,
        voice_connection: null,
        now_playing_data: {},
        queue: [],
        stopped: false,
        inform_np: true
    };
});
