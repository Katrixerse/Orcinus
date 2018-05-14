const Discord = require("discord.js");
const bot = new Discord.Client();
const superagent = require('superagent');
exports.run = async (client, message, args) => {
    const { body } = await superagent
       .get('https://nekos.life/api/neko');
       const embed = new Discord.RichEmbed()
       .setColor(0x00A2E8)
       .setImage(body.neko)
       message.channel.send(embed)
 }
   
