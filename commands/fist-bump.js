const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require("snekfetch")
exports.run = async (client, message, args) => {
      if (message.mentions.users.size < 1) return message.channel.send("you can't fist-bump nobody")
      let user = message.guild.member(message.mentions.users.first());
            message.channel.send(`${user} You got a fist-bump from ${message.author.username} ❤`,{
                embed: {
                    image: {
                        url: "https://i.imgur.com/lO2xZHC.gif"
                    }
                }
            })
}
   
