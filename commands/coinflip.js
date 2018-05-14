const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      var coinflip = ['Heads!','Tails!'];
      message.channel.send(coinflip[Math.floor(Math.random () * coinflip.length)]);
}
   
