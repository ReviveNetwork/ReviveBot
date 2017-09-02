const UserLastSeen = require('./../../orm/UserLastSeen');
module.exports.message = message => {
    createLastSeen(message.author.id);
};
module.exports.presence = member => {
    createLastSeen(member.user.id);
}
function createLastSeen(userid, timestamp) {
    //console.log(`${userid} last seen at ${timestamp}`);
    new UserLastSeen({
        id: userid
    }).save().catch(() => console.log("Unable to save last seen for " + userid));
}