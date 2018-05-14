const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
    let autogoogle = args.join('+');
    if (autogoogle.length < 1) return message.reply('You must supply a LMGTFY.').catch(console.error);
    const embed = new Discord.RichEmbed()
        .setColor(0x738BD7)
        .setDescription(`Here you go, **${message.author.username}**: http://lmgtfy.com/?q=` + (args.join('+')))
    message.channel.send({embed})
}
   
