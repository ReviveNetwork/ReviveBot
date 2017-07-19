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
    let ownerc = Object.values(carray).filter(c => c.owner);
    let modc = Object.values(carray).filter(c => c.mod);
    let func = Object.values(carray).filter(c => c.fun);
    let revivec = Object.values(carray).filter(c => c.custom);
    if (settings.owners.includes(message.author.id)) {
        res = res + "**Owner Only Commands:** \n";
        ownerc.map(
            (t) => {
                res = res + "**" + t.key + "** : " + t.value.description + "\n";
            }
        )
    }
    res = res + "**Moderator/Admin Only Commands:** \n";
    modc.map(
        (t) => {
            res = res + "**" + t.key + "** : " + t.value.description + "\n";
        }
    )
    res = res + "**Fun/Utility Commands:** \n";
    func.map(
        (t) => {
            res = res + "**" + t.key + "** : " + t.value.description + "\n";
        }
    )
    res = res + "**ReviveNetwork Commands:** \n";
    revivec.map(
            (t) => {
                res = res + "**" + t.key + "** : " + t.value.description + "\n";
            }
        )
    message.author.send(res);
}
