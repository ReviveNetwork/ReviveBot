const refresh = require('./../lib/refresh');
module.exports = async function (member) {
    var user = member.user;
    if (member.guild.id === "184536578654339072") {
        if (member.user.bot) return console.log(member.user.tag + " is a bot who joined " + member.guild.name)
        if (await refresh(user, true)) {
            user.send("Welcome to the Revive Network\nBecome a verified member and get exclusive benefits by linking your discord account with your Revive account\nTo link, please follow this link\nhttps://battlelog.co/discord_link.php");
        }
    }
}