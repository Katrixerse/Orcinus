const Discord = require("discord.js");
const bot = new Discord.Client();
const snek = require('snekfetch');
const fsn = require('fs-nextra');
exports.run = async (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission('ATTACH_FILES')) return message.reply('Sorry, i dont have the perms to do this cmd i need ATTACH_FILES. :x:')
   const { Canvas } = require('canvas-constructor');
    if (message.mentions.users.size < 1) return message.channel.send("You didn't mention a user to make them shit");
   const getSlapped = async (person) => {
    const plate = await fsn.readFile('./assets/images/plate_shit.png');
    const png = person.replace('.gif', '.png');
    const { body } = await snek.get(png);
    return new Canvas(634, 775)
    .setColor(0x00A2E8)
    .addRect(0, 0, 434, 675)
    .addImage(plate, 0, 0, 634, 775)
    .addImage(body, 200, 505, 169, 169, { type: 'round', radius: 85 })
    .toBuffer();
  }
     try {
    const person = message.mentions.users.first().avatarURL;
    const result = await getSlapped(person);
    await message.channel.send({ files: [{ attachment: result, name: 'shit.png' }] });
  } catch (error) {
    throw error;
  }
}