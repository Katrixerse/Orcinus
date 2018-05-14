const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
  const emoji = message.guild.emojis;
  if (!emoji.size) return message.channel.send("Server has no emojis")
  const embed = new Discord.RichEmbed()
  .addField("Server Emojis", emoji.map((e) => e).join(' '))
  message.channel.send({embed})
}
   
