const bookshelf = require('./../bookshelf');
var UserLastSeen = bookshelf.Model.extend({
    tableName: 'users_last_seen',
    hasTimestamps: false
});
module.exports = UserLastSeen;
