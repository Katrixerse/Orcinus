const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
  const choice1 = args[0]
  const choice2 = args.slice(1).join(" ")
  if (choice2 < 1) return message.channel.send("Didnt provide a second option to choose from.")
  var choices = [`${choice1}`, `${choice2}`]
  message.channel.send(`I choose ${choices[Math.floor(Math.random() * choices.length)]}!`);
}