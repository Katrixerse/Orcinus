const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
      const superagent = require("superagent");
      const { body } = await superagent
      .get('https://random.dog/woof.json');
      const embed  = new Discord.RichEmbed()
      .setColor(0x00A2E8)
      .setImage(body.url)
      if (body.url.includes(".mp4")) return; // As mp4s cant really be set as a image for a embed and will cause a error in the console
      message.channel.send({embed})
}
