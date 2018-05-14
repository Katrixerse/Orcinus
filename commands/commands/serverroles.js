const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
    const role = message.guild.roles;
  const embed = new Discord.RichEmbed()
    .addField("Server Roles", role.map((e) => e).join(', '))
  message.channel.send({embed}) 
}
   
