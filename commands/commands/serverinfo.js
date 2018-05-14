const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
   const role = message.guild.roles.size;
   const online = message.guild.members.filter(m => m.presence.status != 'offline').size
   const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];
      const embed = new Discord.RichEmbed()
     .setAuthor(message.guild.name, message.guild.iconURL)
     .setColor(0x00A2E8)
      .setDescription(`Owner: ${message.guild.owner.user.tag} (${message.guild.owner.id})`)
      .addField('Member Count', `${message.guild.memberCount}`, true)
      .addField('Online', `${online}`, true)
      .addField('Server Region', message.guild.region)
      .addField('Created At', message.guild.createdAt.toLocaleString(), true)
      .addField("Verification Level: ", `${verificationLevels[message.guild.verificationLevel]}`)
      .addField('Voice Channels' , `${message.guild.channels.filter(chan => chan.type === 'voice').size}`)
      .addField('Text Channels' , `${message.guild.channels.filter(chan => chan.type === 'text').size}`, true)
      .addField('Roles', role, true)
      message.channel.send({embed}) 
}
   