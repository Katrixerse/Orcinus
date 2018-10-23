const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
  const prefixtouse = row.prefix
  const usage = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Command: " + prefixtouse + "ban")
            .addField("Usage", prefixtouse + "ban @Someone <reason>")
            .addField("Example", prefixtouse + "ban @Someone for ad links to other discords")
            .setDescription("Description: " + "Bans a user from the current server");

  if (message.member.hasPermission("BAN_MEMBERS")) {
  if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.reply('Sorry, i dont have the perms to do this cmd i need BAN_MEMBERS. :x:')
  if (message.mentions.users.size < 1) return message.channel.send(usage)
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args.slice(0).join(" "));
  if (user.highestRole.position >= message.member.highestRole.position) return message.reply('I cant ban that member. They are the same level as you or higher. :x:');
  let reason = args.slice(1).join(' ') || `Moderator didn't give a reason.`;
  let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
  if (!message.guild.member(user).bannable) return message.reply(' I cant ban that member. This may be happening because they are above me. :x:');
  message.guild.ban(user, 2);
  message.channel.send("***The User has been successfully banned! :white_check_mark:***")
  sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);

  const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setTitle("Case #" + row.casenumber + " | Action: Ban")
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
