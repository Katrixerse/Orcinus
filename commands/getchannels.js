const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
    message.channel.send('Voice Channels: ' + `${message.guild.channels.filter(chan => chan.type === 'voice').size} | Text Channels:  ${message.guild.channels.filter(chan => chan.type === 'text').size}`)
}
   
