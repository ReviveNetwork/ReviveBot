const UserLastSeen = require('./../../orm/UserLastSeen');
module.exports.message = message => {
    createLastSeen(message.author.id, message.createdTimestamp);
};
module.exports.presence = member => {
    createLastSeen(member.user.id, Date.now());
}
function createLastSeen(userid, timestamp) {
    new UserLastSeen({
        id: userid,
        timestamp: timestamp
    }).save();
}