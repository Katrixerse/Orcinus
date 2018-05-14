const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
    const url = args.join("")
    try {
        const { body } = await snekfetch
            .post('https://www.googleapis.com/urlshortener/v1/url')
            .query({
                longUrl: url,
                key: "GOOGLEKEY" 
            })
            .send({
                longUrl: url
            });
        message.channel.send(`New url is: ${body.id}`);
    } catch (err) {
        message.reply(`An error occurred: \`${err.message}\`. Try again later!`);
    }
}