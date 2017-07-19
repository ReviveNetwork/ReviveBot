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
                let duration = 5000;
                if(settings.muted)
                {
                    let is_muted = settings.muted.find(function(t){
                        if((t.id == message.author.id) && (t.time > (Date.now() - 10000) )) 
                            return t;
                    });
                    if(is_muted)
                        return;
                    is_muted = settings.muted.filter(function(t){
                        if((t.id == message.author.id) && (t.time > (Date.now() - 120000) )) 
                            return t;
                    });
                    if(is_muted.length > 0)
                        duration = is_muted.size * duration;
                }
                message.channel.overwritePermissions(message.author, { 'SEND_MESSAGES': false }, "Muted");
                let mm = await message.reply("You have been muted for "+(duration/1000)+" seconds by slowmov for sending messages too fast. Please calm down");
                settings.muted.push({ id:message.author.id , time: Date.now()})
                setTimeout(() => {
                    mm.delete();
                    let p = message.channel.permissionOverwrites.get(message.author.id);
                    if (p)
                        p.delete();
                }, duration)
            }
        }, 2000)

}
