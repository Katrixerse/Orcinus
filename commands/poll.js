const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      if (!message.guild.member(client.user).hasPermission('ADD_REACTIONS')) return message.reply('Sorry, i dont have the perms to do this cmd i need ADD_REACTIONS. :x:')
      const sayMessage = args.join(" ");
     if (sayMessage.length < 1) return message.channel.send("Didnt provide anything for the poll.")
     if (message.member.hasPermission("KICK_MEMBERS")) {
       const embed = new Discord.RichEmbed()
       .setColor(0x00A2E8)
       .setTitle(" Poll ")
       .setDescription(`A poll has begun! The poll is: "**${sayMessage}**"!, vote now!`)
        message.channel.send(embed).then(m => {
            m.react('✅');
            m.react('❌');
           })
      }
}
   
