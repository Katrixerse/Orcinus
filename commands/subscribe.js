const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
    const user = message.mentions.users.first();
   
  	message.guild.member(user).addRole(subscriberRole).then(() => {
      message.channel.send("***You have successfully subscribed! :white_check_mark:***")
      })
    }
