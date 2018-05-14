const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      let user = message.mentions.users.first() || message.author
      const embed = new Discord.RichEmbed()
            .setImage(user.displayAvatarURL)
            .setColor(0x00A2E8)
    message.channel.send({embed})
}
   
