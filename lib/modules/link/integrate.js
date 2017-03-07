const bot = require('../../utils/bot');
const integrate = function (user) {
    var res = "To link your discord account and forum account, please follow the below link \n https://battlelog.co/discord_link.php";
    user.sendMessage(res);

};
module.exports = integrate;