const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
const types = ['top'];
exports.run = async (client, message, args) => {
  const word = args.join(" ")
  try {
    const { body } = await snekfetch
      .get('http://api.urbandictionary.com/v0/define')
      .query({ term: word });
    if (!body.list.length) return message.channel.send('Could not find any results.');
    const data = body.list[types === 'top' ? 0 : Math.floor(Math.random() * body.list.length)];
    const embed = new Discord.RichEmbed()
      .setColor(0x32A8F0)
      .setAuthor('Urban Dictionary', 'https://i.imgur.com/Fo0nRTe.png', 'https://www.urbandictionary.com/')
      .setURL(data.permalink)
      .setTitle(data.word)
      .setDescription((data.definition))
      .addField('Example', data.example);
    const filtercheck = ["xxx", "porn", "sex", "18+","nsfw", "hentai", "dick", "vagina", "pussy"]
    if (filtercheck.some(word2 => data.definition.toLowerCase().includes(word2))) return message.channel.send("Not allowed to search nsfw content.");
    if (filtercheck.some(word3 => data.word.toLowerCase().includes(word3))) return message.channel.send("Not allowed to search nsfw content.");
    message.channel.send(embed);
  } catch (err) {
    return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
}
   
