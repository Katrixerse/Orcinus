const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      if (!message.member.hasPermission("MANAGE_NICKNAMES"))  {
    return message.reply("You do not have permission to change the bot's nickname");
    } else {
      let username = args.join(' ');
      if (username.length < 1) return message.reply('You must supply a name for the client.')
       message.guild.members.get('330044809651814412').setNickname(username);
        const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .addField("Bot username set successfully!", username + " is now the nickname for the bot :white_check_mark:");
        message.reply({embed})
  }
}
