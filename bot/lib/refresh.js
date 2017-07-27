const request = require('request-promise-native');
const bot = require('./../bot');
module.exports = async function (user, noDM) {
    var guild = bot.guilds.get('184536578654339072');
    var member = guild.member(user);
    if (!member)
        return false;
    //console.log(user);
    var id = user.id;
    console.log(id);
    let body = await request("http://" + (process.env.REVIVE_API || 'localhost') + "/v0/discord/userinfo/" + id)
    console.log(body);
    try { var info = JSON.parse(body); }
    catch (e) {
        throw "API Error";
    }
    if (info.hasOwnProperty('error')) {
        if (!noDM) {
            user.send("To link your discord account with your battlelog account follow the link given below\n"
                + "https://battlelog.co/discord_link.php");
            console.log("User " + user.username + " Not Linked. DMing user to link now");
        }
        await member.removeRole('275317218911322112');
        await member.removeRole("273105185566359562");
        await member.setNickname(member.user.username);
        await member.removeRole("318990525539680257");
        return false;
    }
    await member.addRole('275317218911322112');
    if (info.is_donator) {
        if (!member.roles.get("273105185566359562"))
            await member.addRole(guild.roles.get("273105185566359562")).then(user.send('Role added: donators'));
    } else {
        if (member.roles.get("273105185566359562"))
            await member.removeRole(guild.roles.get("273105185566359562")).then(user.send('Role removed: donators'));
    }
    if (info.banned == 1) {
        info.username = "[BANNED] " + info.username;
        if (!member.roles.get("318990525539680257"))
            await member.addRole(guild.roles.get("318990525539680257")).then(user.send('Role added: BANNED'));
    }
    else {
        if (member.roles.get("318990525539680257"))
            await member.removeRole(guild.roles.get("318990525539680257")).then(user.send('Role removed: BANNED'));
    }
    if (member.kickable)
        await member.setNickname(info.username);
    return info;
};
