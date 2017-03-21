module.exports = (message) => {
    if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
        message.channel.sendMessage("You aren't Worthy");
        return;
    }
    var msg = message.content.substring(5).split("to ");
    var r = message.guild.roles.find("name", msg[0].trim());
    r.setPosition(parseInt(msg[1].trim())).catch(message.reply).then(
    message.reply('done'));
}
