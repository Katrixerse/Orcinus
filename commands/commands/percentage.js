const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
    const amount = args[0]
    const maximum = args[1]
    const percentage = (amount / maximum) * 100;
    message.channel.send(`${amount} is ${percentage}% of ${maximum}.`);
}
   
