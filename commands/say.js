const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
        const saywhat = args.join(" ")
        if (saywhat < 1) return message.channel.send("Didn't provide any text to say")
        message.channel.send(`**${message.author.username}** says ` + saywhat)
}
