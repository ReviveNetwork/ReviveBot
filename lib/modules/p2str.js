module.exports = function (soldier, game) {
    if (game == 'bf2')
    { game = 'https://battlelog.co/bfhq.php?pid=' }
    else
    { game = 'https://bl2142.co/bfhq.php?pid=' }
    return soldier.nick + '\t' + "<" + game + soldier.pid + ">";
};