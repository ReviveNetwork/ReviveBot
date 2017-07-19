const request = require('request-promise-native');
module.exports = async function (oldMem, newMem) {
    let user = oldMem.user;
    if (newMem && oldMem.guild && (oldMem.guild.id === "184536578654339072")) {
        if ((!oldMem.roles.has("184684916833779712") && newMem.roles.has("184684916833779712")) || (!oldMem.roles.has("200849956796497920") && newMem.roles.has("200849956796497920")) || (!oldMem.roles.has("184676864630063104") && newMem.roles.has("184676864630063104")) || (!oldMem.roles.has("286646245198528523") && newMem.roles.has("286646245198528523"))) {
            await request({ uri: 'http://localhost/v0/discord/reverse_link/' + user.id, method: "POST" });
        }
    }
    else
        await request({ uri: 'http://localhost/v0/discord/reverse_link/' + user.id, method: "POST" });
}