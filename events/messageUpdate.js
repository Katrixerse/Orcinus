const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");

module.exports = (client, message, editedMessage) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if (!message.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
    if (!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if (!message.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;
    if (!message.guild.member(client.user).hasPermission('READ_MESSAGE_HISTORY')) return;
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
    if (message.author.bot) return;
    if (message === editedMessage) return;
    if (message.channel.type !== 'text') return;
    let guild = message.guild;
    let modlog = guild.channels.find(channel => channel.name == row.logschannel);
     if (!modlog) return;
    const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setThumbnail(message.author.avatarURL)
    .addField("Author ", `${message.author.tag} (ID: ${message.author.id})`, true)
    .addField("Before Edit ", `${message}`, true)
    .addField("After Edit", `${editedMessage}`, true)
    .setTimestamp()
    .setFooter("Message edit in " + message.channel.name);
    if (message.content.includes("http")) return;
    if (message.content.includes("www.")) return;
    client.channels.get(modlog.id).send({embed});
  })
}
