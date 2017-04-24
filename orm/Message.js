const bookshelf = require('./../bookshelf');
const bot = require('./../bot/bot');
var Message = bookshelf.Model.extend({
    tableName: 'discord_messages',
    hasTimestamps: true,
    message: function () {
        return bot.guilds.get(this.channel).fetchMessage(this.messageID)
    }
});
module.exports = Message;