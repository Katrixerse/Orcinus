const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      if (message.member.hasPermission("MANAGE_ROLES")) {
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
  const prefixtouse = row.prefix
  const usage = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Command: " + prefixtouse + "giverole")
            .addField("Usage", prefixtouse + "giverole @Someone <reason>")
            .addField("Example", prefixtouse + "giverole @Someone User is a weeb so adding weebsquad.")
            .setDescription("Description: " + "Gives a user a role in the current server");

  if (message.mentions.users.size < 1) return message.channel.send(usage)
  let user = message.guild.member(message.mentions.users.first());
  if (user.highestRole.position >= message.member.highestRole.position) return message.reply('I cant give the role to that member. They are the same level as you or higher. :x:');
  let roleName = args.slice(1).join(' ')
  if (message.guild.member(client.user).highestRole.position > message.guild.roles.find('name', roleName).position) return message.reply(`Can't give roles that are the same level as me or higher. :x:`);
  let guild = message.member.guild;
  let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
  if (roleName.length > 1) return message.reply('You must give a role name to add a user to it');
  if (!roleName) return message.channel.send("Role may not exist make sure you spell it exact")
  guild.member(user.user.id).removeRole(roleName);
  message.channel.send(user.user.username + ", has been given the role: " + roleName)
  sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`)
  const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setTitle("Case #" + row.casenumber + " | Action: Taken Role")
    .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("User", user.user.tag + " (ID: " + user.user.id + ")")
    .addField("Role Taken", roleName, true)
    .setFooter("Time used: " + message.createdAt.toDateString())
    if (!modlog) return;
    if (row.logsenabled === "disabled") return;
     client.channels.get(modlog.id).send({embed})
        })
    }
}
   
