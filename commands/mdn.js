const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
    try {
        const query = args.join(" ")
        const { body } = await snekfetch
            .get('https://developer.mozilla.org/en-US/search.json')
            .query({
                q: query,
                locale: 'en-US',
                highlight: false
            });
        if (!body.documents.length) return message.channel.send('Could not find any results.');
        const data = body.documents[0];
        const embed = new Discord.RichEmbed()
            .setColor(0x066FAD)
            .setAuthor('Mozilla Developer Network', 'https://i.imgur.com/DFGXabG.png', 'https://developer.mozilla.org/')
            .setURL(data.url)
            .setTitle(data.title)
            .setDescription(data.excerpt);
        return message.channel.send(embed);
    } catch (err) {
        return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
}