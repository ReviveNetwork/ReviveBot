const bot = require('./../bot');
const request = require('request-promise-native')
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    const guild = bot.guilds.get("184536578654339072");
    let member = guild.member(message.author.id);
    if (!member)
        return message.reply("This command is only for Revive Network users");
    if (!member.roles.get("335972667322662923"))
        return message.reply("you are not a beta member");
    let key = await request({
        method: "POST",
        uri: "http://localhost/v0/discord/beta/" + message.author.id
    });
    key = JSON.parse(key);
    if (key.error) {
        return message.reply("You should link your account first");
    }
    else if (key.key) {
        message.author.send("Your new Revive Heroes Alpha token is ```xl\n" + key.key+"\n```\n"+"1. Download the Launcher + Game via the download link in the pins of <#335973035116855296> . Use https:\/\/s3.amazonaws.com\/revive-things\/revive-launcher-heroes.zip if you already downloaded the game via the beta channel before the new beta launcher was released.\r\n2. Keep this key a secret, Its only for backup. The launcher will automatically apply it.\r\n3. Run START_TEST_LAUNCHER.bat to get started.\r\n4. Login with your Revive account\r\n5. Hit play now\r\n\r\nNotes:\r\n- The backend automatically creates 2 soldiers for you. 1 is for the Royals, the other for Nationals. \r\n- Character customizations do not save.\r\n- EVERYTHING you do will be deleted- nothing saved.\r\n- The servers may go down for any amount of time during development- do not fear. Check this channel for updates regularly\r\n- Things will be broken, bear with us!\r\n\r\nCHECK <#335973035116855296> for regular updates")
            .then(()=>message.channel.send("Key has been DMed to you")).catch(()=> message.reply("You have disabled DMs"));
        
    }
    else
        return message.reply("There was some problem generating a key");
}
/**
 * description of the command
 */
const description = "gives a beta key";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
