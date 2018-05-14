const Discord = require("discord.js");
const bot = new Discord.Client();
const Kitsu = require('kitsu');
const kitsu = new Kitsu();
exports.run = async (client, message, args) => {
    const params = args.join(" ")
    if (params.length < 1) return message.reply('You must add a anime to search for');
    let msg = await message.channel.send('*fetching information from kitsu!*');
    try {
        const { data } = await kitsu.fetch('anime', { filter: { text: params.join('-') } });
        const collected = await message.channel.awaitMessages(filter, {
            max: 1,
            maxMatches: 1,
            time: 60000,
            errors: ['time']
        });
        const returnMessage = collected.first();
        await returnMessage.delete();
        const index = Number(returnMessage.content) - 1;
        await msg.edit(`**Title JP:** ${data[index].titles.en_jp}\n**Title English:** ${data[index].titles.en}\n**Type:** ${data[index].subtype}\n**Start Date:** ${data[index].startDate}\n**End Date:** ${data[index].endDate || 'in Progress'}\n**PopularityRank:** ${data[index].popularityRank}\n**Link:** <https://kitsu.io/anime/${data[index].id}>\n**Synopsis:** ${data[index].synopsis}`);
    } catch (error) {
        await msg.edit('I had a error while trying to fetch the data from Kitsu Sorry! did you spell the Anime name right?');
    }
}
   
