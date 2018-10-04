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
            .setTitle("Command: " + prefixtouse + "softban")
            .addField("Usage", prefixtouse + "softban @Someone <reason>")
            .addField("Example", prefixtouse + "softban @Someone trying to start trouble.")
            .setDescription("Description: " + "Bans and unbans a user from the current server");

 if (message.member.hasPermission("KICK_MEMBERS")) {
    if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Sorry, i dont have the perms to do this cmd i need KICK_MEMBERS. :x:')
    let reason = args.slice(1).join(' ') || `Moderator didn't give a reason.`;
    if (message.mentions.users.size < 1) return message.channel.send(usage)
    let user = message.guild.member(message.mentions.users.first());
    if (user.highestRole.position >= message.member.highestRole.position) return message.reply('I cant softban that member. They are the same level as you or higher. :x:');
    let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
    if (!message.guild.member(user).bannable) return message.reply('This member is not banable. Perhaps they have a higher role than me?');
    if (reason.length < 1) return;
    message.channel.send("***The User has been successfully been soft banned! :white_check_mark:***")
    message.guild.ban(user, 2);
    message.guild.unban(user, 2);
    sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
    const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setTitle("Case #" + row.casenumber + " | Action: Soft Ban")
    .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("User", user.user.tag + " (ID: " + user.user.id + ")")
    .addField("Reason", reason, true)
    .setFooter("Time used: " + message.createdAt.toDateString())
      if (!modlog) return;
      if (row.logsenabled === "disabled") return;
    return client.channels.get(modlog.id).send({embed});
    }
  })
}
   
