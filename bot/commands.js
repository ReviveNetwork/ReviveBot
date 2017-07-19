/**
 * On load get all the list of commands
 */
const commands = {};
const settings = require('./../settings.json');
const list = require('./commandlist');
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
    execute: function (cmd, params, message) {
        if (commands[cmd]) {
            let bm = message.channel.messages.filter(m => (m.author.id == message.client.id) && (m.createdTimestamp > Date.now() - 5000)).size
            console.log(bm);
            if (bm > 2 && !(message.channel.name.toLowerCase().includes("bot") || message.channel.name.toLowerCase().includes("command") || message.channel.name.toLowerCase().includes("test")))
                return message.reply("Dont abuse me");
            commands[cmd].execute(params, message).catch(err => message.channel.send(getError(err), { code: 'error', split: true }))//.then(message.delete(3000));
        }
        else if (cmd === 'help')
            help(message);
    }
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
