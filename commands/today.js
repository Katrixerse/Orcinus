const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
  const { text } = await snekfetch
            .get('http://history.muffinlabs.com/date');
        const body = JSON.parse(text);
        const events = body.data.Events;
        const event = events[Math.floor(Math.random() * events.length)];
        const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setURL(body.url)
            .setTitle(`On this day (${body.date})...`)
            .setTimestamp()
            .setDescription(`${event.year}: ${event.text}`);
        return message.channel.send(embed).catch(console.error);
}
   
