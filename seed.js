const bot = require('./bot/bot');
const Message = require('./orm/Message');
bot.on('ready', () => {
    bot.channels.map((channel) => {
        let messages = await channel.fetchMessages({ limit: 100 })
        messages.map((message) => {
            new Message({
                messageID: message.id,
                channel: message.channel.id
            }).save();
        });
    })
});