const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
        const text = args.join(' ')
        const converted = text.split('').reverse().join('');
        message.channel.send(`\u180E${converted}`);
}
   
