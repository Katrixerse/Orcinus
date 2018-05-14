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
            .setTitle("Command: " + prefixtouse + "unmute")
            .addField("Usage", prefixtouse + "unmute @Someone <reason>")
            .addField("Example", prefixtouse + "unmute @Someone muted time is over.")
            .setDescription("Description: " + "Removes a user from the muted role");

 if (message.member.hasPermission("KICK_MEMBERS")) {
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('Sorry, i dont have the perms to do this cmd i need MANAGE_ROLES. :x:')
  if (message.mentions.users.size < 1) return message.channel.send("You did not mention a user to unmute");
  let user = message.guild.member(message.mentions.users.first());
  if (user.highestRole.position >= message.member.highestRole.position) return message.reply('I cant unmute that member. they are the same level as you or higher. :x:');
  let reason = args.slice(1).join(' ') || `Moderator didn't give a reason.`;
  let modlog = message.guild.channels.find('name', row.logschannel);
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!muteRole) return message.reply('I cant find a Muted role :x:')
  if (reason.length < 1) return;
  sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
  const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setTitle("Case #" + row.casenumber + " | Action: Un-mute")
    .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("User", user.user.tag + " (ID: " + user.user.id + ")")
    .addField("Reason", reason, true)
    .setFooter("Time used: " + message.createdAt.toDateString())

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      if (!modlog) return;
      client.channels.get(modlog.id).send({embed})
      if (row.logsenabled === "disabled") return;
      message.channel.send("***The user has been successfully unmuted! :white_check_mark:***")
       })
      }
    }
  })
}