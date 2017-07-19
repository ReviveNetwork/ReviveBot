const settings = require('./../../settings.json');
module.exports = message => {
    if (message.member && message.member != null) {
        let muted = message.member.roles.find(function (r) {
            if (r.name.toLowerCase().includes('mute') && !r.name.toLowerCase().includes('non') && !r.name.toLowerCase().includes('test')) return r
        })
        if (muted && message.deletable)
            message.delete();
    }
    if (!message.author.bot && settings.slowmov && message.channel.deletable && message.member.bannable)
        setTimeout(async function () {
            if (message.member.lastMessage && message.member.lastMessage.id != message.id) {
                message.channel.overwritePermissions(message.author, { 'SEND_MESSAGES': false }, "Muted");
                let mm = await message.reply("You have been muted for 5 seconds by slowmov for sending messages too fast. Please calm down")

                setTimeout(() => {
                    mm.delete();
                    let p = message.channel.permissionOverwrites.get(message.author.id);
                    if (p)
                        p.delete();
                }, 5000)
            }
        }, 2000)

}