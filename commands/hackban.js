const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = async (client, message, args) => {
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
  const prefixtouse = row.prefix
  const usage = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Command: " + prefixtouse + "hackban")
            .addField("Usage", prefixtouse + "hackban <ID> <reason>")
            .addField("Example", prefixtouse + "hackban 130515926117253122 self bot that dms server links and left.")
            .setDescription("Description: " + "Bans a user without needing to be in the server");

  if (message.member.hasPermission("BAN_MEMBERS")) {
  if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.reply('Sorry, i dont have the perms to do this cmd i need BAN_MEMBERS. :x:')
  let user = args[0]
  if (isNaN(user)) return message.channel.send(usage)
  let reason = args[1] || `Moderator didn't give a reason.`;
  if (isNaN(user)) return message.channel.send(usage)
  if (!user) return message.reply('You must supply a User Resolvable, such as a user id.')
  let guild = message.member.guild;
  if (user.length < 1) return message.channel.send("need to provide a valid user id to ban them");
  if (user === message.author.id) return message.channel.send(`:x: Well no you can't hackban yourself`);
  if (message.guild.members.get(user)) return message.channel.send(`:x: That user is in this server, please use ban instead`);
  let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
  message.guild.ban(user, 2);
  sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
  const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setTitle("Case #" + row.casenumber + " | Action: Hack Ban")
    .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("User ID", user)
    .addField("Reason", reason, true)
    .setFooter("Time used: " + message.createdAt.toDateString())
  message.channel.send("ID: " + user + ", has been banned from the server.")
  if (!modlog) return;
  client.channels.get(modlog.id).send({embed});
    }
  })
}
   
