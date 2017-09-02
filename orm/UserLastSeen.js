const bookshelf = require('./../bookshelf');
var users_last_seen = bookshelf.Model.extend({
    tableName: 'users_last_seen',
    hasTimestamps: false
});
module.exports = users_last_seen;
