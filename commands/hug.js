const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require("snekfetch")
exports.run = async (client, message, args) => {
      if (message.mentions.users.size < 1) return message.channel.send("you can't hug nobody")
      let user = message.guild.member(message.mentions.users.first());
        snekfetch.get('https://nekos.life/api/hug')
            .set('Key', 'dnZ4fFJbjtch56pNbfrZeSRfgWqdPDgf')
            .then(r => message.channel.send(`${user} You got a hug from ${message.author.username} ❤`,{
                embed: {
                    image: {
                        url: r.body.url
                    }
                }
            }))
}
   
