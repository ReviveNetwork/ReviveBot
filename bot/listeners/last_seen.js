const UserLastSeen = require('./../../orm/UserLastSeen');
module.exports.message = message => {
    createLastSeen(message.author.id, message.createdTimestamp);
};
module.exports.presence = member => {
    createLastSeen(member.user.id, Date.now());
}
function createLastSeen(userid, timestamp) {
    //console.log(`${userid} last seen at ${timestamp}`);
    new UserLastSeen({
        id: userid,
        timestamp: timestamp
    }).save().catch(() => console.log("Unable to save last seen for " + userid));
}