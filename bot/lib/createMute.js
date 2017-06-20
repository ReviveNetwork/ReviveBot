module.exports = async function (guild) {
    let muted = await guild.createRole({
        data: {
            name: 'muted',
            color: 'GREY',
            permissions: [],
            position: guild.me.highestRole.position + 1
        },
        reason: 'to mute people'
    });
    guild.channels.map(function (c) {
        c.overwritePermissions(muted, { 'SEND_MESSAGES': false }, "setup muted role");
    });
    return muted;

}