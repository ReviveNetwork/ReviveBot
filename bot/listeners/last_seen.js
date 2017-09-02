const UserLastSeen = require('./../../orm/UserLastSeen');
const knex = require('./../../knex')
module.exports.message = message => {
    createLastSeen(message.author.id);
};
module.exports.presence = member => {
    createLastSeen(member.user.id);
}
function createLastSeen(userid, timestamp) {
    //console.log(`${userid} last seen at ${timestamp}`);
    knex('users_last_seen').insert({ id: userid }).catch(() => console.log("Unable to save last seen for " + userid));
}