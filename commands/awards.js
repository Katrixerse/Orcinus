const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
    const embed2 = new Discord.RichEmbed()
    .setColor(0x00A2E8) 
    .setTitle(" Possible Awards ")
    .addField(`:tada: - Reach level 25`, ` + 5,000 money`, true)
    .addField(`:medal: - Reach level 50`, `+ 10,000 money`, true)
    .addField(`:military_medal: - Reach level 75`, `+ 20,000 money`, true)
    .addField(`:trophy:`, `Reach level 100 (max)`, true)
    .addBlankField()
    .addField(`:first_place: - Reach #1 on the leaderboard`, `+5% winning chance`, false)
    .addField(`:moneybag:`, `Earn 10,000 in cash. +1% winning chance`, true)
    .addField(`:credit_card:`, `Earn 100,000 in cash. +3% winning chance`, true)
    .addBlankField()
    .addField(`:spy::skin-tone-1:`, `Secret Award`, true)
    .addField(`:tophat: - Secret Award`, ` +`, true)
    .addField(`:watch:`, `Secret Award`, true)
    .addField(`:tools:`, `Secret Award`, true)
    message.channel.send(embed2) 
}
   
