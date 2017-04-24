const knexfile = require('./knexfile.js');
const knex = require('knex')(knexfile);
module.exports = knex;