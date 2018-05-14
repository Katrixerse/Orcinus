const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require("snekfetch")
exports.run = async (client, message, args) => {
    try {
        		const { body } = await snekfetch.get('http://api.adviceslip.com/advice');
        		message.channel.send(JSON.parse(body.toString()).slip.advice);
        	} catch (err) {
        		message.channel.send(`An error occurred: \`${err.message}\`. Try again later!`);
        	}
        }
   
