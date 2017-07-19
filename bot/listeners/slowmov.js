const settings = require('./../../settings.json');
module.exports = async function (message) {
    if (message.author.bot) return;//ignore if its a verified bot account

    if (!message.guild || message.member == null) return;//ignore if DM

    let muted = message.member.roles.find(function (r) {
        if (r.name.toLowerCase().includes('mute') && !r.name.toLowerCase().includes('non') && !r.name.toLowerCase().includes('test'))
            return r
    })
    if (muted && message.deletable) {
        message.delete();
        message.channel.overwritePermissions(muted, { 'SEND_MESSAGES': false }, "Muted").catch(() => console.log("i tried my best"));
    }
    if (message.channel.name.toLowerCase().includes("bot") || message.channel.name.toLowerCase().includes("command") || message.channel.name.toLowerCase().includes("test")) return;

    if (settings.slowmov && message.channel.deletable && !message.member.permissions.has("MANAGE_MESSAGES") && message.channel.messages) {
        let messages = message.channel.messages.filter(m => m.author.id == message.author.id).filter(m => m.createdTimestamp > Date.now() - 12000);
        if (messages.size > 3) {
            let duration = 10000;
            if (settings.muted) {
                let is_muted = settings.muted.find(function (t) {
                    if ((t.id == message.author.id) && (t.time > (Date.now() - 5000)))
                        return t;
                });
                if (is_muted)
                    return;//settings.muted.push({ id: message.author.id, time: Date.now() });
                is_muted = settings.muted.filter(function (t) {
                    if ((t.id == message.author.id) && (t.time > (Date.now() - 900000)))
                        return t;
                });
                if (is_muted.length > 0)
                    duration = (is_muted.length + 1) * duration;
            }
            message.channel.overwritePermissions(message.author, { 'SEND_MESSAGES': false }, "Muted");
            let mm = await message.reply("You have been muted for " + (duration / 1000) + " seconds by slowmov for sending messages too fast. Please calm down");
            settings.muted.push({ id: message.author.id, time: Date.now() })
            setTimeout(() => {
                mm.delete();
                let p = message.channel.permissionOverwrites.get(message.author.id);
                if (p)
                    p.delete();
            }, duration)
        }
    }

}
