const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
      .setTitle("Bot Uptime")
      .addField("Day(s)", (Math.round(client.uptime / (1000 * 60 * 60 * 24))))
      .addField("Hour(s)", (Math.round(client.uptime / (1000 * 60 * 60)) % 24))
      .addField("Minute(s)", (Math.round(client.uptime / (1000 * 60)) % 60))
      .addField("Second(s)", (Math.round(client.uptime / 1000) % 60))
      .setColor(0x00A2E8)
     message.channel.send({embed})
}
