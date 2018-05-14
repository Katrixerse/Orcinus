const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      const embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor(0x00A2E8)
      .setTitle("Changelog v0.9.4")
      .addField("Changes", "- Added meme\n- Added showerthoughts\n- Added choose \n- Improvements to warnings system\n- Fixed other small bugs")
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({embed}) 
 }
   
