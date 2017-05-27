const bot = require('../bot');
bot.on('message',async function(message){
  if(message.channel.id === "317859245309689856")
  {
    await message.delete(10);
    if(message.content.toLowerCase().includes("accept"))
    {
      await message.member.removeRole(bot.guilds.get("184536578654339072").roles.get("317854639431221248"));
    }
  }
});
