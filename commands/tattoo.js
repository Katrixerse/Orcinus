const Discord = require("discord.js");
const bot = new Discord.Client();
const snek = require('snekfetch');
const fsn = require('fs-nextra');
exports.run = async (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission('ATTACH_FILES')) return message.reply('Sorry, i dont have the perms to do this cmd i need ATTACH_FILES. :x:')
   const { Canvas } = require('canvas-constructor');
    if (message.mentions.users.size < 1) return message.channel.send("You didn't mention a user to put them as a tattoo");
   const getSlapped = async (person) => {
    const plate = await fsn.readFile('./assets/images/plate_tattoo.png');
    const png = person.replace('.gif', '.png');
    const { body } = await snek.get(png);
    return new Canvas(684, 825)
    .setColor(0x00A2E8)
    .addRect(0, 0, 434, 675)
    .addImage(plate, 0, 0, 684, 825)
    .addImage(body, 200, 505, 271, 271, { type: 'round', radius: 125 })
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