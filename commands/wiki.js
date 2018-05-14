const Discord = require("discord.js");
const bot = new Discord.Client();
const superagent = require('superagent');
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
const query = args.join(' ');
        const { body } = await snekfetch
            .get('https://en.wikipedia.org/w/api.php')
            .query({
                action: 'query',
                prop: 'extracts',
                format: 'json',
                titles: query,
                exintro: '',
                explaintext: '',
                redirects: '',
                formatversion: 2
            });
        if (body.query.pages[0].missing) return message.channel.send('No Results.');
        const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle(body.query.pages[0].title)
            .setAuthor('Wikipedia', 'https://i.imgur.com/a4eeEhh.png')
            .setDescription(body.query.pages[0].extract.substr(0, 2000).replace(/[\n]/g, '\n\n'));
        return message.channel.send(embed).catch(console.error);
 }
   
