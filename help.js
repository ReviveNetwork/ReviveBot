const bot = require('./bot');

var config = require('./config');

bot.on('message', message => {
    var channel = message.channel;

    if (message.author.bot && ! channel.name.includes('help') ) {
        return;
    }
    var user = message.author;
    message = message.content.toLowerCase();
    //Error updating
    if (message.includes('updating') && message.includes('forever')) {
        channel.sendMessage('Follow this article \n http://battlelog.co/wiki.php?article=27');
    }
    //Error debugging
    if (message.includes('unkown dynamicoption')) {
        channel.sendMessage('Follow the second part of this article. \n http://battlelog.co/post.php?id=9744');
    }
    //Mouse stuck after launch ingame
    if (message.includes('mouse') && message.includes('stuck')) {
        channel.sendMessage('follow this article\nhttp://battlelog.co/wiki.php?article=7');
    }
    //Invalid CD key Fix
    if (message.includes('invalid') && message.includes('cdkey')) {
        channel.sendMessage('follow these articles\nhttps://battlelog.co/post.php?id=16014&page=1\nhttp://battlelog.co/wiki.php?article=28');
    }
    //Installation Errors
    if (message.includes('installation') && message.includes('failed')) {
        channel.sendMessage('follow this article\nhttp://battlelog.co/post.php?id=17435#p57246');
    }
    //Black screen after launch
    if (message.includes('black screen') && message.includes('help')) {
        channel.sendMessage('Follow this article \nhttp://battlelog.co/post.php?id=9744');
    }
    //Login Errors
    if (message.includes('error') && message.includes('api')) {
        channel.sendMessage('Follow this article \n https://battlelog.co/post.php?id=17435#p93129');
    }
    //DirectX9 errors after launhcer
    if (message.includes('directx9') && message.includes('error')) {
        channel.sendMessage('Follow this article \n https://battlelog.co/wiki.php?article=14');
    }
    //Server Rules Battlelog
    if (message.includes('server') && message.includes('rules')) {
        channel.sendMessage('Follow this article \n https://battlelog.co/post.php?id=19581');
    }
    //Howto Report players
    if (message.includes('howto') && message.includes('report')) {
        channel.sendMessage('Follow this article \n https://battlelog.co/post.php?id=15931');
    }
});
