const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
        const subreddit = args.join(" ") || 'random'
        const subRedCat = args.slice(1).join(" ") || 'random'
        const { body } = await snekfetch
            .get(`https://www.reddit.com/r/${subreddit}/${subRedCat}.json`)
       
        if (!message.channel.nsfw && meme.over_18) return message.channel.send("🔞 Cannot display NSFW content in a SFW channel.");
        let meme;
        if (body[0]) {
          meme = body[0].data.children[Math.floor(Math.random() * body[0].data.children.length)].data;
        } else {
          meme = body.data.children[Math.floor(Math.random() * body.data.children.length)].data;
        }
        await message.channel.send(`${meme.title} submitted by ${meme.author} in ${meme.subreddit_name_prefixed}\nUpvote Ratio ${meme.upvote_ratio}\n${meme.url}`);
        const embed = new Discord.RichEmbed()
        .setImage(body.neko)
        message.channel.send(embed);
  }
   
