module.exports = function (message) {
    let res = message.content.trim().substring(9);
    let base = res.split(' ')[0];
    res = res.substring(base.length + 1).trim();
    base = parseInt(base);
    res = parseInt(res).toString(base);
    console.log(res); message.channel.sendMessage(res);
}