const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
const msg = await message.channel.send('Pinging...');
  msg.edit(":ping_pong: Time: " + Math.round(msg.createdTimestamp - message.createdTimestamp) + "ms \n         :heart: Heartbeat: " + Math.round(client.ping) + "ms");
}
