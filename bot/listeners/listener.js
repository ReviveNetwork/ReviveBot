module.exports = {
    message: [
        require('./saveMessage'),
        require('./slowmov'),
        require('./digest'),
        require('./help'),
        require('./last_seen').message
    ],
    guildMemberAdd: [
        require('./welcome')
    ],
    guildMemberUpdate: [
        require('./refreshStatus')
    ],
    guildMemberRemove: [
        require('./refreshStatus')
    ],
    addNav: [
        require('./reactionNav').addNav
    ],
    messageReactionAdd: [
        require('./reactionNav').reactionAdd
    ],
    presenceUpdate: [
        require('./last_seen').presence
    ]
}