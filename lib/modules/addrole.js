module.exports = (message) => {
    if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
        message.channel.sendMessage("You aren't Worthy");
        return;
    }
    var member = message.guild.member(message.mentions.users.first());
    var msg = message.content.split("to ");
    member.addRole(message.guild.roles.find("name", msg[msg.length - 1]));
    message.reply('done');
}