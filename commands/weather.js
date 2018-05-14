const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
    const query = args.join(" ");
        const { body } = await snekfetch
            .get('https://query.yahooapis.com/v1/public/yql')
            .query({
                q: `select * from weather.forecast where u='f' AND woeid in (select woeid from geo.places(1) where text="${query}")`, // eslint-disable-line max-len
                format: 'json'
            });
        if (!body.query.count) return msg.say('Location Not Found.');
        const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setAuthor(body.query.results.channel.title, 'https://i.imgur.com/2MT0ViC.png')
            .setURL(body.query.results.channel.link)
            .setTimestamp()
            .addField('City',
                body.query.results.channel.location.city, true)
            .addField('Country',
                body.query.results.channel.location.country, true)
            .addField('Region',
                body.query.results.channel.location.region, true)
            .addField('Condition',
                body.query.results.channel.item.condition.text, true)
            .addField('Temperature',
                `${body.query.results.channel.item.condition.temp}°F`, true)
            .addField('Humidity',
                body.query.results.channel.atmosphere.humidity, true)
            .addField('Pressure',
                body.query.results.channel.atmosphere.pressure, true)
            .addField('Rising',
                body.query.results.channel.atmosphere.rising, true)
            .addField('Visibility',
                body.query.results.channel.atmosphere.visibility, true)
            .addField('Wind Chill',
                body.query.results.channel.wind.chill, true)
            .addField('Wind Direction',
                body.query.results.channel.wind.direction, true)
            .addField('Wind Speed',
                body.query.results.channel.wind.speed, true);
        return message.channel.send(embed).catch(console.error);
  }
   
