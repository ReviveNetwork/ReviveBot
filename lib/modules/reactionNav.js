database = {};
const bot = require('../utils/bot');
bot.on('addNav', ob => {
    database[ob.message.id] = { arr: ob.arr, index: 0, game: ob.game };
    setTimeout(() => {
        ob.message.edit(ob.message.content + "\nReactions Navigator Expired");
        delete database[ob.message.id];
    }, 300000
    )
});
bot.on('messageReactionAdd', (reaction, user) => {
    if (user == bot.user) return;
    let ob = database[reaction.message.id];
    let index = ob.index
    if (!ob) return;
    if (reaction.emoji.name === ':arrow_right:')
        index++;
    if (reaction.emoji.name === ':arrow_left:')
        index--;
    if (reaction.emoji.name === ':fast_forward:')
        index = ob.arr.length - 1;
    if (reaction.emoji.name === ':rewind:')
        index = 0;
    if (index == ob.index) return;
    ob.index = index;
    p2str(ob.arr[index], ob.game).then(res => reaction.message.edit(res + "\nPlayer" + index + " of " + ob.arr.length));
    reaction.remove(user);
})