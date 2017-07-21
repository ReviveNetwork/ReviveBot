/**
 * On load get all the list of commands
 */
const commands = {};
const settings = require('./../settings.json');
const list = require('./commandlist');
let access_log = false;
try {
    access_log = require('./../access_log.json');
}
catch (e) {
    access_log = [];
}
const getcommands = () => {
    Object.entries(list).forEach(
        ([key, value]) => {
            commands[key] = require('./commands/' + value);
        }
    );
}
getcommands();
const getError = function (err) {
    if (settings.debug)
        return err.stack
    else
        return err
}
module.exports = {
    execute: async function (cmd, params, message) {
        if (commands[cmd]) {
            if (commands[cmd].fun) {
                if (settings["disabled-channels"].includes(message.channel.id))
                    return access_log.push({
                        time: message.createdTimestamp,
                        author: message.author.id,
                        command: cmd,
                        fun: commands[cmd].fun,
                        denied: true,
                        success: false,
                        channel: message.channel.id,
                        normalChannel: (!message.channel.name.toLowerCase().includes("bot") && !message.channel.name.toLowerCase().includes("command") && !message.channel.name.toLowerCase().includes("test"))
                    })
                let commandsexec = access_log.filter(ac => (ac.command == cmd) && (ac.time > message.createdTimestamp - 30000) && ac.normalChannel && ac.fun).size;
                if (commandsexec > 5) {
                    await message.reply("Please use " +
                        message.client.channels.find(ch =>
                            ch.name.toLowerCase().includes("bot") || ch.name.toLowerCase().includes("test")
                        ).toString()
                        + " for spamming the bot"
                    )
                    access_log.push({
                        time: message.createdTimestamp,
                        author: message.author.id,
                        command: cmd,
                        fun: commands[cmd].fun,
                        denied: true,
                        success: false,
                        channel: message.channel.id,
                        normalChannel: (!message.channel.name.toLowerCase().includes("bot") && !message.channel.name.toLowerCase().includes("command") && !message.channel.name.toLowerCase().includes("test"))
                    });
                }
            }
            commands[cmd].execute(params, message).then(
                mr => access_log.push({
                    time: message.createdTimestamp,
                    author: message.author.id,
                    command: cmd,
                    success: mr,
                    denied: false,
                    fun: commands[cmd].fun,
                    channel: message.channel.id,
                    normalChannel: (!message.channel.name.toLowerCase().includes("bot") && !message.channel.name.toLowerCase().includes("command") && !message.channel.name.toLowerCase().includes("test"))
                })
            ).catch(err => {
                access_log.push({
                    time: message.createdTimestamp,
                    author: message.author.id,
                    command: cmd,
                    success: false,
                    denied: false,
                    error: err.stack,
                    fun: commands[cmd].fun,
                    channel: message.channel.id,
                    normalChannel: (!message.channel.name.toLowerCase().includes("bot") && !message.channel.name.toLowerCase().includes("command") && !message.channel.name.toLowerCase().includes("test"))
                })
                message.channel.send(getError(err), { code: 'error', split: true }).catch(console.log)
            })
        }
        else if (cmd === 'help')
            help(message);
    },
    access_log: access_log
}
function help(message) {
    let res = "";
    let carray = [];
    Object.entries(commands).forEach(
        ([key, value]) => {
            carray.push({ key, value });
        }
    )
    let ownerc = Object.values(carray).filter(c => c.value.owner);
    let modc = Object.values(carray).filter(c => c.value.mod);
    let func = Object.values(carray).filter(c => c.value.fun);
    let revivec = Object.values(carray).filter(c => c.value.custom);
    if (settings.owners.includes(message.author.id)) {
        res = res + "**Owner Only Commands:** \n\n";
        ownerc.map(
            (t) => {
                res = res + "**" + t.key + "** : " + t.value.description + "\n";
            }
        )
    }
    res = res + "\n**Moderator/Admin Only Commands:** \n\n";
    modc.map(
        (t) => {
            res = res + "**" + t.key + "** : " + t.value.description + "\n";
        }
    )
    res = res + "\n**Fun/Utility Commands:** \n\n";
    func.map(
        (t) => {
            res = res + "**" + t.key + "** : " + t.value.description + "\n";
        }
    )
    res = res + "\n**ReviveNetwork Commands:** \n\n";
    revivec.map(
        (t) => {
            res = res + "**" + t.key + "** : " + t.value.description + "\n";
        }
    )
    message.author.send(res, { split: true });
}
