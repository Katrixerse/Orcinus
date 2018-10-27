const Discord = require("discord.js");
const moment = require('moment');
require('moment-duration-format');
exports.run = (client, message, args) => {
  try {
    const embed = new Discord.RichEmbed()
      .setTitle("Bot Uptime")
      .addField('Uptime:', moment.duration(client.uptime).format('d [days], h [hours], m [minutes], s [seconds]', { trim: "small" }), true)
      .setColor(0x00A2E8)
     message.channel.send(embed)
  } catch (err) {
      message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
}
