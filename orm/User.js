const bookshelf = require('./../bookshelf');
const bot = require('./../bot/bot');
const Message = require('./Message')
var User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: false
});
module.exports = User;
