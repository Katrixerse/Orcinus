const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
      let embed = new Discord.RichEmbed()
  .setImage("https://i.ytimg.com/vi/GD6qtc2_AQA/maxresdefault.jpg")
  .setColor(0x00A2E8)
  message.channel.send({embed});
}
   
