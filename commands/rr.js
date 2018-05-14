const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
    var roulette = [':gun: Pow! You are dead , try again?',':gun: Luckily for yourself, ***you survived***! Would you like to test your luck again ?',':gun: Oh darn, it didnt shoot! Or Is that a good thing? (Try Again)'];
    message.channel.send(roulette[Math.floor(Math.random () * roulette.length)]);
  }
   
