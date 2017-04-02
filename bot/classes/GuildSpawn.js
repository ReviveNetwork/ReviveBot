/**
 * ----------------------Guilding---------------------------
 * Guilding is a new concept of spawning instances for each guild
 * 
 */
const cp = require('child_process')
module.exports = class GuildSpawn {
    constructor(guild) {
        this.id = guild.id;
        /**
         * voice_channel stores voice channel for that guild
         */
        this.voice_channel = guild.channels.filter((c) => {
            if (c.type === 'voice')
                return c;
        }).find((c) => {
            let cn = c.name.toLowerCase();
            if (cn.includes("music") || cn.includes("voice"))
                return c;
        });
        /**
         * text_channel stores text channel which issues music commands
         */
        this.text_channel = guild.channels.filter((c) => {
            if (c.type === 'text')
                return c;
        }).find((c) => {
            let cn = c.name.toLowerCase();
            if (cn.includes("voice") || cn.includes("music"))
                return c;
        });
        this.queue = [];
        this.spawnComplete = false;
        this.p = cp.fork('./bot/lib/musicFork.js', [guild.id, this.voice_channel.id, this.text_channel.id]);
    };

}