const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      const botstatus = ['Online', 'Idle', 'Do Not Disturb', 'Invisable'];
        const embed = new Discord.RichEmbed()
        .addField("Bot Status: ", `${botstatus[client.status]}`);
        message.channel.send(embed)
}
   
