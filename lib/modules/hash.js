const check = require('./checksum');
module.exports = (message) => {
    let res = message.content.trim().substring(6);
    let algo = res.split(' ')[0];
    res = res.substring(algo.length + 1).trim();
    if (crypto.getHashes().indexOf(algo) === -1) {
        message.channel.sendMessage('Invalid algorithm \n Valid hashing Algorithms are:\n' + crypto.getHashes().join(' , '));
        return;
    }
    res = checksum(res, algo);
    console.log(res); message.channel.sendMessage('hash of message:' + res);
    if (message.attachments.size > 0) {
        res = message.attachments.first().url;
        request(res).then(body => message.channel.sendMessage('Hash of file:\n' + checksum(body, algo)));
    }
}