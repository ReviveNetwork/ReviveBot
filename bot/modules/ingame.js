const bot = require('./../bot');
bot.on('ready',async function(){
  const guild =  bot.guilds.get("184536578654339072");
  const ingame = guild.roles.get("322233107489226764");
  let playing = guild.members.filterArray(function (m) {
        if (m.presence.game && m.presence.game.name)
            if (m.presence.game.name.toLowerCase().includes("battlefield 2"))
                return m.user.id;
    });
  let toRemove = ingame.members.filter(function (m){
      if(!playing.includes(m.id))
        return m;
    });
    toRemove.map(async function(m){
      await m.removeRole(ingame);
   });
   playing.map(async function(m){
      await m.addRole(ingame);
   });
}
bot.on('presenceUpdate',async function(om,m){
    if (om.presence.game && om.presence.game.name)
            if (om.presence.game.name.toLowerCase().includes("battlefield 2"))
                await m.removeRole("322233107489226764");
    if (m.presence.game && m.presence.game.name)
            if (m.presence.game.name.toLowerCase().includes("battlefield 2"))
                await m.addRole("322233107489226764");
})
