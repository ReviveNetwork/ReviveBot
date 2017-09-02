const bookshelf = require('./../bookshelf');
const Message = require('./Message')
var User = bookshelf.Model.extend({
    tableName: 'users_last_seen',
    hasTimestamps: false
});
module.exports = User;
