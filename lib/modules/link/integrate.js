const urlencode = require('urlencode');
const bot = require('../../utils/bot');
const integrate = function (user) {
    //user is an user onject. get it using message.author
    let id = urlencode(new Buffer(JSON.stringify({
        id: user.id,
        name: user.username
    })).toString('base64'));
    var res = "To link your discord account and forum account, please follow the below link \n https://battlelog.co/discord_link.php?id=" + id;
    user.sendMessage(res).then(() => "DMed link");
    //setTimeout(exports.refreshUser(user),120000);
};
module.exports = integrate;