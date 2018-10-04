const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
let chrono = require("chrono-node");
var moment = require('moment');
const superagent = require("superagent");
exports.run = async (client, message, args) => {
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
  sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
  const prefixtouse = row.prefix
  const usage = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Command: " + prefixtouse + "mute")
            .addField("Usage", prefixtouse + "mute @Someone <minutes> <reason>")
            .addField("Example", prefixtouse + "mute @Someone 5 spamming in general.")
            .setDescription("Description: " + "Gives a user the muted role for x minutes");

  if (message.member.hasPermission("KICK_MEMBERS")) {
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('Sorry, i dont have the perms to do this cmd i need MANAGE_ROLES. :x:')
  if (message.mentions.users.size < 1) return message.channel.send(usage)
  let user = message.guild.member(message.mentions.users.first());
  if (user.highestRole.position >= message.member.highestRole.position) return message.reply('I cant mute that member. They are the same level as you or higher. :x:');
  let messagez = parseInt(args[1])
  if (isNaN(messagez)) return message.channel.send("That is not a valid time")
  if (messagez > 1440) return message.channel.send('Maximum time is 1 day (1440 minutes)');
  if (messagez < 1) return message.channel.send('Time must be at least 1 minute.');
  let reason = args.slice(2).join(' ') || `Moderator didn't give a reason.`;
  let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
  if (reason.length < 1) return;
  let muteRole = client.guilds.get(message.guild.id).roles.find(r => r.name == 'Muted') || client.guilds.get(message.guild.id).roles.find('name', 'muted');
  if (!muteRole) return message.channel.send(" I can not find a Muted role :x:");

  const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setTitle("Case #" + row.casenumber + " | Action: Mute")
    .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("User", user.user.tag + " (ID: " + user.user.id + ")")
    .addField("Time", messagez, true)
    .addField("Reason", reason, true)
    .setFooter("Time used: " + message.createdAt.toDateString())

    message.guild.member(user).addRole(muteRole).then(() => {
      message.channel.send("***The user has been successfully muted for " + messagez + " minute(s) :white_check_mark:***")

  if (!modlog) {
     setTimeout(() => {
     message.guild.member(user).removeRole(muteRole)
     message.channel.send(user.user.username + ' has now been unmuted after ' + messagez +' minute(s)')
     }, messagez * 60000);
    } else if (row.logsenabled === "disabled") {
     setTimeout(() => {
     message.guild.member(user).removeRole(muteRole)
    message.channel.send(user.user.username + ' has now been unmuted after ' + messagez +' minute(s)')
     }, messagez * 60000);
    } else {
     client.channels.get(modlog.id).send({embed})
     setTimeout(() => {
     message.guild.member(user).removeRole(muteRole)
    message.channel.send(user.user.username + ' has now been unmuted after ' + messagez +' minute(s)')
     }, messagez * 60000);
    }
  })
}
})
}
   
