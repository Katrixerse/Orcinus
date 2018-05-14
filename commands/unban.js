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
            .setTitle("Command: " + prefixtouse + "unban")
            .addField("Usage", prefixtouse + "unban <ID> <reason>")
            .addField("Example", prefixtouse + "unban 130515926117253122 asked for a second chance.")
            .setDescription("Description: " + "Unbans a user from the current server");

      if (message.member.hasPermission("BAN_MEMBERS")) {
     if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.reply('Sorry, i dont have the perms to do this cmd i need BAN_MEMBERS. :x:')
     let user = args[0]
     if (isNaN(user)) return message.channel.send(usage)
     let reason = args.slice(1).join(' ') || `Moderator didn't give a reason.`;
     let modlog = message.guild.channels.find('name', row.logschannel);
     if (reason.length < 1) return message.channel.send(usage)
     if (!user) return message.channel.send(usage)
     if (user === message.author.id) return message.channel.send(`:x: Well no you can't unban yourself`);
	   if (message.guild.members.get(user)) return message.channel.send(`:x: That user is not banned from the server`);
     message.guild.unban(user, 2);
     sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
     const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setTitle("Case #" + row.casenumber + " | Action: Unban")
    .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("ID:", user)
    .addField("Reason", reason, true)
    .setFooter("Time used: " + message.createdAt.toDateString())
     message.channel.send("User has been unbanned from the server")
     if (!modlog) return;
     if (row.logsenabled === "disabled") return;
     client.channels.get(modlog.id).send({embed})
       }
    })
}