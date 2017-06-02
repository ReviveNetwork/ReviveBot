const request = require('request-promise-native');
const bot = require('./../bot');
const md = require('to-markdown');
const RichEmbed = require('discord.js').RichEmbed;
const did_from_uname = async function (uname) {
    let res = await request('http://localhost/v0/discord/did_from_uname/' + encodeURIComponent(uname));
    console.log(res);
    res = JSON.parse(res);
    return res.id;
}
module.exports = {
    'ping': function (body) {
        console.log("Recieved a ping event\n" + body);
    },
    'post': async function (body) {
        console.log("Recieved a post event for post no: " + body.post.post_number);
        let embed = new RichEmbed();
        embed.setAuthor(body.post.username, body.post.avatar_template.replace('{size}', "100")).setDescription(md(body.post.cooked))
        if (body.post.reply_to_user && body.post.reply_to_user.username) {
            let id = await did_from_uname(body.post.reply_to_user.username);
            if (id)
                bot.users.get(id).send('You recieved a reply from ' + body.post.username + ' for post ' + body.base_url + '/t/' + body.post.topic_slug + '/' + body.post.topic_id + '/' + body.post.post_number, { embed: embed })
        }
    },
    'user': async function (body) {
        console.log("Recieved user event");
    }
}
