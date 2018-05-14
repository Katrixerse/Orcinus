const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
   const query = args.join(" ");
        const { body } = await snekfetch
            .get('https://www.googleapis.com/youtube/v3/search')
            .query({
                part: 'snippet',
                type: 'video',
                maxResults: 1,
                q: query,
                key: "GOOGLEKEY"
            });
        if (!body.items.length) return message.channel.send('No results found for ' + query + ".");
        const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle(body.items[0].snippet.title)
            .setDescription(body.items[0].snippet.description)
            .setAuthor(`YouTube - ${body.items[0].snippet.channelTitle}`, 'https://i.imgur.com/hkUafwu.png')
            .setURL(`https://www.youtube.com/watch?v=${body.items[0].id.videoId}`)
            .setThumbnail(body.items[0].snippet.thumbnails.default.url);
        return message.channel.send(embed).catch(console.error);
}
