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
module.exports = {
    execute: function (cmd, params, message) {
        if (commands[cmd]) {
            commands[cmd].execute(params, message).catch(err => message.channel.sendCode('error', err.stack)).then(message.delete(3000));
        }
        else if (cmd === 'help')
            help(message);
    }
}
function help(message) {
    let res = "List of commands are as follows: \n";
    Object.entries(commands).forEach(
        ([key, value]) => {
            res = res + "**" + key + "** : " + value.description + "\n";
        }
    )
    message.author.sendMessage(res);
}
