const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      const embed = new Discord.RichEmbed()
      .setColor(0x00A2E8)
      .addField("Developer", "Mr. Robot#0101, YorkAARGH, dragonfire535")
      .addField("Special thanks too:", `EthericDestruction#7890 \nAndrew#0307 \nN'Zoth#2769 \nSaorax ツ#9242`)
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({embed}) 
 }
   
