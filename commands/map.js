const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
    try {
        const zoom = args[0]
        const location = args.slice(1).join(" ")
        const { body } = await snekfetch
            .get('https://maps.googleapis.com/maps/api/staticmap')
            .query({
                center: location,
                zoom,
                size: '500x500',
                key: "GOOGLE_KEY"
            });
        const url = `https://www.google.com/maps/search/${encodeURIComponent(location)}`;
        return message.channel.send(`<${url}>`, { files: [{ attachment: body, name: 'map.png' }] });
    } catch (err) {
        return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
}
