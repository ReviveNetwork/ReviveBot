/**
 * Initialise child process
 */
const ytdl = require('ytdl-core');
const streamOptions = {
    seek: 0,
    volume: 0.5
};
const bot = require('./../bot');
module.exports = {};
exports = module.exports;
let guild = process.argv[2];
let voice_channel = process.argv[3];
let text_channel = process.argv[4];
let queue = [];
let voice_handler = null;
let voice_connection = null;
let stopped = false;
let inform_np = true;
let now_playing_data = {};
/**
 * List of commands
 */
const cmd = {
    play: function (url, user, channel) {
        let member = guild.member(bot.users.get(user));
        if (!url.includes("http")) {
            if (is_queue_empty())
                setTimeout(() => process.exit(), 1000);
        }
        console.log("QUEUE size" + queue.length);
        member.setVoiceChannel(voice_channel).catch(() => {
            message.reply("JOIN A VOICE CHANNEL");
            if (is_queue_empty())
                setTimeout(() => process.exit(), 1000);
        });
        if (text_channel == null)
            text_channel = channel;
        if (queue.length === 0) {
            voice_channel.join().then(connection => {
                voice_connection = connection;
                add_to_queue(url, user, channel);
            }).catch(console.error);
        } else {
            add_to_queue(url, user, channel);
        }
    },
    playnext: function (message, user, channel) {
        if (voice_handler !== null) {
           bot.channels.get(channel).sendMessage("Skipping..");
            voice_handler.end();
        } else {
            play_next_song();
        }
    },
    clear: function (message, user, channel) {
        if (!guild.member(bot.users.get(user)).hasPermission("MOVE_MEMBERS")) {
            bot.channels.get(channel).sendMessage("Not Worthy");
            return;
        }
        queue = [];

        if (stopped) {
            bot.channels.get(channel).sendMessage("Playback is already stopped!");
        } else {
            if (voice_handler !== null) {
                voice_handler.end();
            }
            stopped = true;
            bot.channels.get(channel).sendMessage("Stopping!");
        }
        voice_connection.disconnect();
        setTimeout(() => process.exit(), 1000);
    },
    pause: function (message, user, channel) {
        if (stopped) {
            bot.channels.get(channel).sendMessage("Playback is already paused!");
        } else {
            stopped = true;
            if (voice_handler !== null) {
                voice_handler.end();
            }
            bot.channels.get(channel).sendMessage("pausing!");
        }
    },
    resume: function (message) {
        if (stopped) {
            stopped = false;
            if (!is_queue_empty()) {
                play_next_song();
            }
        } else {
            bot.channels.get(channel).sendMessage("Playback is already running");
        }
    },
    setvol: function (vol, user, channel) {
        vol = parseInt(vol);
        if (vol > 1 || vol < 0)
            bot.channels.get(channel).sendMessage("Invalid Volume. Volume Range(0-1)");
        voice_handler.setVolume(vol);
        bot.channels.get(channel).sendMessage("Volume Has been set");
    },
    queue: function (message, user, channel) {
        var response = "";

        if (is_queue_empty()) {
            response = "the queue is empty.";
        } else {
            for (var i = 0; i < queue.length; i++) {
                response += "<" + queue[i]["video"] + "> (requested by "
                    + queue[i]["user"] + ")\n";
            }
        }
        bot.channels.get(channel).sendMessage(response);
    }
}
/**
 * Listen to commands here
 */
process.on('message', (m) => {
    if (typeof m !== 'object')
        return console.log(m);
    console.log(m);
    cmd[m.cmd](m.message, m.user, m.channel);
});
/**
 * send Ready statement
 */
bot.on('ready', () => {
    guild = bot.guilds.get(guild);
    voice_channel = bot.channels.get(voice_channel);
    text_channel = bot.channels.get(text_channel);
    process.send({ guild: guild.id });
});
/**
 * Utillity functions 
 */
function add_to_queue(url, user, channel) {
    queue.push({
        video: url,
        user: bot.users.get(user).username
    });
    bot.channels.get(channel).sendMessage('added to the queue.');
    if (!stopped
        && !is_bot_playing()
        && queue.length === 1) {
        play_next_song();
    }
}

function play_next_song() {
    if (queue.length == 0) {
        text_channel.sendMessage("Queue Empty");
        return "Queue Empty";
    }
    var url = queue[0]["video"];
    var user = queue[0]["user"];

    now_playing_data["video"] = url;
    now_playing_data["user"] = user;

    if (inform_np) {
        text_channel.sendMessage('Now playing: <' + url + '> (requested by ' + user + ')');
    }

    var audio_stream = ytdl(url);
    voice_handler = voice_connection.playStream(audio_stream, streamOptions);

    voice_handler.once("end", reason => {
        voice_handler = null;
        if (!stopped && !is_queue_empty()) {
            play_next_song();
        } else if (is_queue_empty()) {
            voice_connection.disconnect();
            setTimeout(() => process.exit(), 1000);
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
process.on('error', process.send);
