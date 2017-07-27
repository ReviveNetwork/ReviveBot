const bot = require('./../bot');
const influx = require('./../../influx');
const request = require('request-promise-native');
let ingame;
let guild;
const updateIngame = async function () {
  if (!guild && !ingame) return;

  let playing = await request('http://' + (process.env.REVIVE_API || 'localhost') + '/v0/discord/online');
  playing = JSON.parse(playing);

  let toRemove = ingame.members.filter(function (m) {
    if (!playing.includes(m.user.id)) {
      //console.log("Not playing : "+ m.user.id)
      return m;
    }
  });
  await Promise.all(toRemove.map(async function (m) {
    await m.removeRole(ingame);
  }));
  await Promise.all(playing.map(async function (m) {
    if (m === "") return;
    const user = await bot.fetchUser(m);
    if (!user) return;
    try {
      const member = await guild.fetchMember(user);
      if (!member.roles.get(ingame.id))
        await member.addRole(ingame);
    }
    catch (e) {
    }
  }));
  influx.writePoints([
    {
      measurement: 'statistics',
      fields: { count: playing.length },
      tags: { type: 'ingame' }
    }
  ]).catch(console.log);
};
bot.on('ready', () => {
  guild = bot.guilds.get("184536578654339072");
  ingame = guild.roles.get("322233107489226764");
});
setInterval(updateIngame, 5000)
