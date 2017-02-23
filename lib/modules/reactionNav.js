let database = {};
const p2str = require('./p2str');
const bot = require('../utils/bot');
bot.on('addNav', ob => {
    database[ob.message.id] = { arr: ob.arr, index: 0, game: ob.game };
    ob.message.edit(ob.message.content + "\nPlayer 1 of " + ob.arr.length);
    setTimeout(() => {
        //ob.message.edit(ob.message.content + "\nReactions Navigator Expired");
        ob.message.reactions.map(r => r.remove(bot.user).catch(console.log));
        delete database[ob.message.id];
    }, 300000
    )
});
bot.on('messageReactionAdd', (reaction, user) => {
    if (user == bot.user) return;
    let ob = database[reaction.message.id];
    if (!ob) return;
    let index = ob.index
    if (reaction.emoji.name === '▶')
        index++;
    if (reaction.emoji.name === '◀')
        index--;
    if (reaction.emoji.name === '⏩')
        index = ob.arr.length - 1;
    if (reaction.emoji.name === '⏪')
        index = 0;
    if (index == ob.index) return;
    if (index < 0 || index === ob.arr.length) {
        reaction.remove(user);
        return;
    }
    ob.index = index;
    p2str(ob.arr[index], ob.game).then(res => reaction.message.edit(res + "\nPlayer " + (index + 1) + " of " + ob.arr.length));
    reaction.remove(user);
})
