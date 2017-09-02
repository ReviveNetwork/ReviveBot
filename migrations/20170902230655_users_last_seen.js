
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users_last_seen', function (t) {
        t.string('id').notNull();
        t.timestamp('timestamp').notNull().defaultTo(0);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users_last_seen');
};
