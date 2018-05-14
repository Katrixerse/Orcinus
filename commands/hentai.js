const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
        const { body } = await snekfetch
            .get('https://nekos.life/api/lewd/neko')
       
        if (!message.channel.nsfw) return message.channel.send("Cannot send NSFW content in a SFW channel.")
        const embed = new Discord.RichEmbed()
        .setImage(body.neko)
        message.channel.send(embed).catch(console.error);
  }
   
