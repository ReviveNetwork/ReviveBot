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
        channel.send('With Electronic Arts announcing with DICE, Gamespy\'s shutdown, all the games in the shutdown list went from a propriety of the distributor and publisher to the state of \" abandon ware \". \r\n\r\nAn abandon ware simply means it\'s a game that have been published and distributed by a company or many companies and they stop endorcing the game. They drop theirs publishing responsabilities, letting the game drifting in a grey area where it either die forever without any change to be played or they drift until someone have the means and the will to do what Revive did when they picked up Battlefield 2 and Battlefield 2142 and revived it. \n\nRevive has made it transparent to EA what Revive is all about. At the moment, EA neither endorse nor prohibit Revive most probably due to the following: \n\n1) EA has decided not to make money out of BF2 anymore, hence their end of support after gamespy shutdown, and BF2 not anymore being sold by them and Steam (there are actually some cases where players contacted EA to purchase BF2, and in the end are given a free download by them). \n\n2) They know Revive, unlike them, is NOT a business generating income, and is just a free community service. \n\n3) If EA wants Revive to shut down, they will inform Revive - which in this case, Revive will respect their wishes and will do so.',{split:true});
    }
});
