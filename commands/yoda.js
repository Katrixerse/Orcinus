const Discord = require("discord.js");
const bot = new Discord.Client();
const snek = require('snekfetch');
exports.run = async (client, message, args) => {
    const speech = args.join(' ');
    if (speech.length < 2) return message.channel.send(`${message.author.username} You must supply text for Yoda. Yes.`);
    const { text } = await snek.get(`http://yoda-api.appspot.com/api/v1/yodish?text=${encodeURIComponent(speech.toLowerCase())}`);
    message.channel.send(JSON.parse(text).yodish).catch(console.error);
}
