const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
     if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You're missing MANAGE_GUILD permission");
     if (!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return message.reply('Sorry, i dont have the perms to do this cmd i need MANAGE_MESSAGES. :x:')
     sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
         if (row.slowmode === "enabled") {
             sql.run(`UPDATE scores SET slowmode = "disabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
             message.channel.send("Slow mode has been disabled")
                  let modlog = message.guild.channels.find('name', row.logschannel);
                    const embed = new Discord.RichEmbed()
                    .setColor(0x00A2E8)
                    .setTitle("Case #" + row.casenumber + " | Action:  Slow Mode Disabled")
                    .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
                    .setFooter("Time used: " + message.createdAt.toDateString())
                    if (!modlog) return;
                    if (row.logsenabled === "disabled") return;
                    return client.channels.get(modlog.id).send({embed});
                } else {
                    const timetoset = parseInt(args[0])
                    const prefixtouse = row.prefix
                    const usage = new Discord.RichEmbed()
                        .setColor(0x00A2E8)
                        .setThumbnail(client.user.avatarURL)
                        .setTitle("Command: " + prefixtouse + "slowmode")
                        .addField("Usage", prefixtouse + "slowmode <seconds>")
                        .addField("Example", prefixtouse + "slowmode 5")
                        .setDescription("Description: " + "Enables slowmode in the current server and users can only send messages every x seconds");

                    if (isNaN(timetoset)) return message.channel.send(usage)
                    if (timetoset.length < 1) return message.channel.send(usage)
                    sql.run(`UPDATE scores SET slowmode = "enabled", slowmodetime = ${timetoset}, casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
                     message.channel.send("Slow mode has been enabled with the time of " + timetoset + " seconds")
                      let modlog = message.guild.channels.find('name', row.logschannel);
                    const embed = new Discord.RichEmbed()
                    .setColor(0x00A2E8)
                    .setTitle("Case #" + row.casenumber + " | Action:  Slow Mode Enabled")
                    .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
                    .addField("Time", timetoset, true)
                    .setFooter("Time used: " + message.createdAt.toDateString())
                    if (!modlog) return;
                    if (row.logsenabled === "disabled") return;
                    return client.channels.get(modlog.id).send({embed});

         }
    })
}