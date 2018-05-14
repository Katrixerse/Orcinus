const Discord = require("discord.js");
const bot = new Discord.Client();
const snek = require('snekfetch');
const fsn = require('fs-nextra');
exports.run = async (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission('ATTACH_FILES')) return message.reply('Sorry, i dont have the perms to do this cmd i need ATTACH_FILES. :x:')
   const { Canvas } = require('canvas-constructor');
    if (message.mentions.users.size < 1) return message.channel.send("You didn't mention a user to respect them");
   const getSlapped = async (person) => {
    const plate = await fsn.readFile('./assets/images/image_respects.png');
    const png = person.replace(/\.(gif|jpg|png|jpeg)\?size=2048/g, '.png?size=128');
    const { body } = await snek.get(png);
    return new Canvas(720, 405)
    .addRect(0, 0, 720, 405)
    .setColor('#000000')
    .addImage(body, 110, 45, 90, 90)
    .resetTransformation()
    .addImage(plate, 0, 0, 720, 405)
    .toBuffer();
  }
     try {
    const person = message.mentions.users.first().avatarURL;
    const result = await getSlapped(person);
    await message.channel.send({ files: [{ attachment: result, name: 'rip.png' }] });
  } catch (error) {
    throw error;
  }
}