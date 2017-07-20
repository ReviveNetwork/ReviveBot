const influx = require('./../../influx');
const Message = require('./../../orm/Message');
const bot = require('./../bot.js');
let ready = false;
bot.on('ready', async function () {
    let dbs = await influx.getDatabaseNames();
    console.log(dbs);
    if (!dbs || dbs === null)
        console.log("Cant connect to influx")
    if (!dbs.includes('discord')) {
        console.log("Creating Dicord DB");
    }
    ready = true;
});

setInterval(async function () {
    if (!ready) return;
    const guild = bot.guilds.get("184536578654339072");
    influx.writePoints([
        {
            measurement: 'statistics',
            fields: { count: guild.memberCount },
            tags: { type: 'members' }
        }
    ]).catch(console.log);
    let count = await Message.count();
    if (count)
        influx.writePoints([
            {
                measurement: 'statistics',
                fields: { count: count },
                tags: { type: 'messages' }
            }
        ]).catch(console.log);
    guild.roles.map(r => {
        influx.writePoints([
            {
                measurement: 'statistics',
                fields: { count: r.members.size },
                tags: { type: r.id }
            }
        ]).catch(console.log);
    });
    influx.writePoints([
        {
            measurement: 'statistics',
            fields: { count: guild.presences.filter(p => p.status != 'offline').size },
            tags: { type: "online" }
        }
    ]).catch(console.log);
}, 1000)
