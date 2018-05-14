const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
    if (!message.guild.member(client.user).hasPermission('ADD_REACTIONS')) return message.reply('Sorry, i dont have the perms to do this cmd i need ADD_REACTIONS. :x:')
    const superagent = require('superagent');
    const { body } = await superagent
        .get('http://www.rrrather.com/botapi');
    const embed = new Discord.RichEmbed()
        .setTitle(`${body.title} Choice A Or B?`)
        .setURL(body.link)
        .setColor(0x00A2E8)
        .setDescription(`${body.choicea} OR ${body.choiceb}?`);
    message.channel.send({embed}).then(m => {
        m.react('🅰');
        m.react('🅱');
    });
}
