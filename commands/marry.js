const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require("snekfetch")
exports.run = async (client, message, args) => {
      if (message.mentions.users.size < 1) return message.channel.send("you can't marry nobody")
      let user = message.guild.member(message.mentions.users.first());
            message.channel.send(`${user} You got married with ${message.author.username} ❤`,{
                embed: {
                    image: {
                        url: "https://i.imgur.com/u67QLhB.gif"
                    }
                }
            })
}
   
