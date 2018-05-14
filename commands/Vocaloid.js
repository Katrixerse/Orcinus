const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
    try {
        const query = args.join(" ")
        const { body } = await snekfetch
            .get('http://vocadb.net/api/songs')
            .query({
                query,
                maxResults: 1,
                sort: 'FavoritedTimes',
                preferAccurateMatches: true,
                nameMatchMode: 'Words',
                fields: 'ThumbUrl,Lyrics'
            });
        if (!body.items.length) return message.channel.send('Could not find any results.');
        const data = body.items[0];
        const embed = new Discord.RichEmbed()
            .setColor(0x86D2D0)
            .setAuthor('VocaDB', 'https://i.imgur.com/6QwraDT.jpg', 'http://vocadb.net/')
            .setTitle(data.name)
            .setURL(`http://vocadb.net/S/${data.id}`)
            .setDescription(data.lyrics.length ? data.lyrics[0].value : 'No lyrics available.')
            .setThumbnail(data.thumbUrl)
            .addField('Artist', data.artistString)
            .addField('Publish Date', new Date(data.publishDate).toDateString(), true);
        return message.channel.send(embed);
    } catch (err) {
        return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
}