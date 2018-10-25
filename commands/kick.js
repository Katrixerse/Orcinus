const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
  sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
  const prefixtouse = row.prefix
  const usage = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Command: " + prefixtouse + "kick")
            .addField("Usage", prefixtouse + "kick @Someone <reason>")
            .addField("Example", prefixtouse + "kick @Someone for ad links to other discords")
            .setDescription("Description: " + "Kicks a user from the current server");

  if (message.member.hasPermission("KICK_MEMBERS")) {
  if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Sorry, i dont have the perms to do this cmd i need KICK_MEMBERS. :x:')
    let reason = args.slice(1).join(' ') || `Moderator didn't give a reason.`;
    if (message.mentions.users.size < 1) return message.channel.send(usage);
    let user = message.guild.member(message.mentions.users.first());
  if (user.highestRole.position >= message.member.highestRole.position) return message.reply('I cant kick that member. They are the same level as you or higher. :x:');
  let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
  message.channel.send("***The user tagged has been successfully kicked! :white_check_mark:***")
  if (!message.guild.member(user).kickable) return message.reply('I can\'t kick that member :x:');
  message.guild.member(user).kick(); 
  const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setTitle("Case #" + row.casenumber + " | Action: Kick")
    .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("User", user.user.tag + " (ID: " + user.user.id + ")")
    .addField("Reason", reason, true)
    .setFooter("Time used: " + message.createdAt.toDateString())
    if (!modlog) return;
    if (row.logsenabled === "disabled") return;
    client.channels.get(modlog.id).send({embed});
      }
    })
}
   
