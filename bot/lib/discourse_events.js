const request = require('request-promise-native');
const bot = require('./../bot');
const settings = require('./../settings');
const md = require('to-markdown');
const RichEmbed = require('discord.js').RichEmbed;
const mentionReg = /\[@[a-z]*\]\(\/u\/[a-z]*\)/igm;
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
        let toMention =[];
        let embed = new RichEmbed();
        body.post.cooked = md(body.post.cooked)
        embed.setAuthor(body.post.username, body.base_url + body.post.avatar_template.replace('{size}', "100")).setDescription(body.post.cooked)
        if (body.post.reply_to_user && body.post.reply_to_user.username) {
            toMention.push({
                name: body.post.reply_to_user.username,
                message: 'You recieved a reply from ' + body.post.username + ' for post ' + body.base_url + '/t/' + body.post.topic_slug + '/' + body.post.topic_id + '/' + body.post.post_number
            });
        }
        let mentions = body.post.cooked.match(mentionReg);
        if(mentions && mentions!=null)
        {
            mentions.map(function(m){
                let u = m.match(/@[a-z]*/i)[0].substring(1);
                toMention.push({
                    name: u,
                    message: 'You were mentioned by ' + body.post.username + ' in ' + body.base_url + '/t/' + body.post.topic_slug + '/' + body.post.topic_id + '/' + body.post.post_number
                });
            });
        }
        // check for private_message
        let topic = await request(body.base_url+ '/t/'+body.post.topic_id+'.json?api_key='+settings.discourse_api+'&api_username=revivebot');
        topic = JSON.parse(topic);
        if(topic.archetype && topic.archetype ==='private_message' && topic.details.participants)
        {
            topic.details.participants.map(function(p){
                if(p.username === body.post.username)
                    toMention.push({
                    name: p.username,
                    message: 'You were DMed by ' + body.post.username + ' in ' + body.base_url + '/t/' + body.post.topic_slug + '/' + body.post.topic_id + '/' + body.post.post_number
                });
            })
        }
        for(let i=0;i<toMention.length;i++)
        {
            let id = await did_from_uname(toMention[i].name);
            bot.users.get(id).send(toMention[i].message, { embed: embed })
        }
    },
    'user': async function (body) {
        console.log("Recieved user event");
    }
}
