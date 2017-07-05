const bot = require('../bot');

bot.on('message', message => {
    var channel = message.channel;
    if (message.author.bot) return;
    if (message.channel.id != "260294049964097537") return;//it is not the help channel
    var user = message.author;
    message = message.content.toLowerCase();
    //Error updating
    if (message.includes('updat') && ( message.includes('forever') || message.includes('keeps') || message.includes('progress') )) {
        channel.send('Follow this article \n http://battlelog.co/wiki.php?article=27');
    }
    //Error debugging
    else if (message.includes('unknown') && message.includes('option')) {
        channel.send('Follow the second part of this article. \n http://battlelog.co/post.php?id=9744');
    }
    //Mouse stuck after launch ingame
    else if (message.includes('mouse') && message.includes('stuck')) {
        channel.send('follow this article\nhttp://battlelog.co/wiki.php?article=7');
    }
    //Invalid CD key Fix
    else if (message.includes('invalid') && message.includes('key')) {
        channel.send('follow these articles\nhttps://battlelog.co/post.php?id=16014&page=1\nhttp://battlelog.co/wiki.php?article=28');
    }
    //Installation Errors
    else if (message.includes('install') && message.includes('fail')) {
        channel.send('follow this article\nhttp://battlelog.co/post.php?id=17435#p57246');
    }
    //Black screen after launch
    else if (message.includes('black') && message.includes('screen')) {
        channel.send('Follow this article \nhttp://battlelog.co/post.php?id=9744');
    }
    //Login Errors
    else if (message.includes('error') && message.includes('api')) {
        channel.send('Follow this article \n https://battlelog.co/post.php?id=17435#p93129');
    }
    //DirectX9 errors after launhcer
    else if (message.includes('direct') && message.includes('error')) {
        channel.send('Follow this article \n https://battlelog.co/wiki.php?article=14');
    }
    //Server Rules Battlelog
    else if (message.includes('server') && message.includes('rule')) {
        channel.send('Follow this article \n https://battlelog.co/post.php?id=19581');
    }
    //Howto Report players
    else if (message.includes('how') && message.includes('report')) {
        channel.send('Follow this article \n https://battlelog.co/post.php?id=15931');
    }
    else if (message.includes('patch') && message.includes('help')) {
        channel.send('Follow this post \n https://battlelog.co/post.php?id=19446#p68847');
    }
    else if (message.includes('connect') && message.includes('blue')) {
        channel.send('It seems your using the old launcher. Download the new launcher using this link \n http://download.bf2.us/launcher-release/Setup.exe',{files: ['https://battlelog.co/img/revive-launcher.png']});
    }
    else if (message.includes('leg') && message.includes('is') && (message.includes('project')|| message.includes('revive') || message.includes('battlelog'))) {
        channel.send('As Gamespy shutdown, all the games hosted by Gamespy became \"abandonware\" as EA no longer wished to support them.\nAbandonware is computer software that is no longer distributed or supported by the developer or copyright holder.\nAs long as we do not modify the software no more than we need to get it working and do not profit from it, EA will not profibit the game revival.\n\nRevive has made itself transparent to EA. At the moment, EA neither endorse nor prohibit Revive mostly due to the following reasons: \n\n1) EA has decided not to earn profit out ofnthe games anymore and  hence have ended thier support for the games after gamespy shutdown. There were also some cases where players contacted EA to purchase the games and in the end were given to them for free.\n\n2) They know that Revive, unlike them, is an non-profit organization working to provide support for abondaned games.\n\nIf EA decides to finally shut Revive down, Revive will respect thier wish to do so.',{split:true});
    }
});
