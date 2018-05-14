/*const Discord = require("discord.js");
const bot = new Discord.Client();
async function embedSan(embed) {
    embed.message ? delete embed.message : null;
    embed.footer ? delete embed.footer.embed : null;
    embed.title ? delete embed.title.embed : null;
    embed.provider ? delete embed.provider.embed : null;
    embed.thumbnail ? delete embed.thumbnail.embed : null;
    embed.image ? delete embed.image.embed : null;
    embed.author ? delete embed.author.embed : null;
    embed.fields ? embed.fields.forEach(f => {delete f.embed;}) : null;
    return embed;
  }
exports.run = async (client, message, args) => {
    const modlog = client.channels.find('name', 'modlogs');
    const caseNumber = args[0];
    const newReason = args.join(' ');
  
    await modlog.fetchMessages({limit:100}).then((messages) => {
      const caseLog = messages.filter(m => m.author.id === client.user.id &&
        m.embeds[0] &&
        m.embeds[0].type === 'rich' &&
        m.embeds[0].title &&
        m.embeds[0].title.text.startsWith('Case') &&
        m.embeds[0].title.text === `Case #${caseNumber}`
      ).first();
      modlog.fetchMessage(caseLog.id).then(logMsg => {
        const embed = logMsg.embeds[0];
        embedSan(embed);
        embed.description = embed.description.replace(`Awaiting moderator's input. Use >reason ${caseNumber} <reason>.`, newReason);
        logMsg.edit({embed});
      });
    });
};*/
   
