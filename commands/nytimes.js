const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
    try {
        const query = args.join(" ")
        if (query < 1) return message.channel.send("Need to provide something to search for.")
        const fetch = snekfetch
            .get('https://api.nytimes.com/svc/search/v2/articlesearch.json')
            .query({
                'api-key': "NYTIMESKEY",
                sort: 'newest'
            });
        if (query) fetch.query({ q: query });
        const { body } = await fetch;
        if (!body.response.docs.length) return message.say('Could not find any results');
        const data = body.response.docs[Math.floor(Math.random() * body.response.docs.length)];
        const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setAuthor('New York Times', 'https://i.imgur.com/ZbuTWwO.png', 'https://www.nytimes.com/')
            .addField('Publish Date', new Date(data.pub_date).toDateString(), true)
            .setURL(data.web_url)
            .setTitle(data.headline.main)
            .setDescription(data.snippet);
        return message.channel.send(embed);
    } catch (err) {
        return;
    }
}
