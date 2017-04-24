exports.up = function (knex, Promise) {
    return knex.schema.createTable('discord_messages', function (t) {
        t.string('messageID').notNull();
        t.string('channel').notNull();
    });
};

exports.down = function (knex, Promise) {
    exports.down = function (knex, Promise) {
        return knex.schema.dropTable('discord_messages');
    };
};