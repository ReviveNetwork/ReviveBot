let database = {};
module.exports.addNav = ob => {
    database[ob.message.id] = { arr: ob.arr, index: 0, exec: ob.exec };
    ob.message.edit(ob.message.content + "\n 1 of " + ob.arr.length);
    setTimeout(() => {
        ob.message.clearReactions();
        database[ob.message.id] = null;
        delete database[ob.message.id];
    }, 300000
    )
};
module.exports.reactionAdd =  (reaction, user) => {
    if (user.bot) return;
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
    ob.exec(ob.arr[index]).then(res => reaction.message.edit(res + "\n" + (index + 1) + " of " + ob.arr.length)).catch(reaction.message.edit);
    reaction.remove(user);
}
