const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
const { promisifyAll } = require('tsubaki');
const xml = promisifyAll(require('xml2js'));
exports.run = async (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("Cannot send NSFW content in a SFW channel.")
    const query = args.join('_');
    if (query < 1) {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/rule34.json?sort=top&t=week')
            .query({ limit: 800 });
    const allowed = !message.channel.nsfw ? body.data.children : body.data.children.filter(post => post.data.over_18);
    if (!allowed.length) return message.channel.send('It seems we are out of fresh iamges for you!, Try again later.');
    const randomnumber = Math.floor(Math.random() * allowed.length)
    const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setTitle(allowed[randomnumber].data.title)
        .setImage(allowed[randomnumber].data.url)
    message.channel.send(embed)
    } else {
        const { text } = await snekfetch
            .get('https://rule34.xxx/index.php')
            .query({
                page: 'dapi',
                s: 'post',
                q: 'index',
                tags: query,
                limit: 1
            });
        const { posts } = await xml.parseStringAsync(text);
        if (posts.$.count === '0') return message.channel.send('No Results found for ' + query + '.');
        const embed = new Discord.RichEmbed()
        .setTitle("Results for " + query)
        .setImage(posts.post[0].$.file_url)
        .setColor(0x00A2E8)
        message.channel.send(embed).catch(console.error);
        }
  }
   
