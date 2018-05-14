const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
      let embed = new Discord.RichEmbed()
  .setThumbnail("http://logok.org/wp-content/uploads/2014/05/Paypal-logo-pp-2014.png")
  .setDescription("Thank you for considering donating, the bots funding costs A LOT of money, so any bit of money would help our discord bot stay alive, thank you and bot on!")
  .setColor(0x00A2E8)
  .addField("Paypal Email", "zachary_2000@live.com")
  .addField("Patreon", "https://www.patreon.com/orcinusbot")
  message.channel.send({embed});
}
   
