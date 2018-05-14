const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = (client, message, args) => {
    try {
        const query = args[0]
        const country = args[1]
        const { body } = await snekfetch
            .get('https://itunes.apple.com/search')
            .query({
                term: query,
                media: 'music',
                entity: 'song',
                limit: 1,
                explicit: message.channel.nsfw ? 'yes' : 'no',
                country
            });
        const body2 = JSON.parse(body.toString());
        if (!body2.results.length) return message.channel.send('Could not find any results.');
        const data = body2.results[0];
        const embed = new Discord.RichEmbed()
            .setColor(0xFEFEFE)
            .setAuthor('iTunes', 'https://i.imgur.com/PR29ow0.jpg', 'https://www.apple.com/itunes/')
            .setURL(data.trackViewUrl)
            .setThumbnail(data.artworkUrl100)
            .setTitle(data.trackName)
            .addField('❯ Artist', data.artistName, true)
            .addField('❯ Album', data.collectionName, true)
            .addField('❯ Release Date', new Date(data.releaseDate).toDateString(), true)
            .addField('❯ Genre', data.primaryGenreName, true);
        return message.channel.send(embed);
    } catch (err) {
        if (err.statusCode === 400) {
            returnmessage.channel.send('Invalid country code. Refer to <https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes>.');
        }
        return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
}