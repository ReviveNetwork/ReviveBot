const crypto = require('crypto');
module.exports = function (str, algorithm) {
    console.log(str);
    console.log(algorithm);
    return crypto
        .createHash(algorithm || 'md5')
        .update(str)
        .digest('hex')
}