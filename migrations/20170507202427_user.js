
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (t) {
        t.string('id').notNull();
        t.integer('score').notNull().defaultTo(1000);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
