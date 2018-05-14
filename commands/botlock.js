const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
     if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You are missing MANAGE_GUILD permission");
     sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
        const prefixtouse = row.prefix
        const usage = new Discord.RichEmbed()
                  .setColor(0x00A2E8)
                  .setThumbnail(client.user.avatarURL)
                  .setTitle("Command: " + prefixtouse + "botlock")
                  .addField("Usage", prefixtouse + "botlock <channelname>")
                  .addField("Example", prefixtouse + "botlock bot-commands")
                  .setDescription("Description: " + "Limits commands to work in one channel only.");

                  const newprefix = args[0]
                  if (newprefix < 1) return message.channel.send(usage)
                  if (newprefix > 20) return message.channel.send(usage)


         if (row.botlock == "disabled") {
            sql.run(`UPDATE scores SET botlock = "enabled", casenumber = ${row.casenumber + 1}, botlockchannel = "${newprefix}" WHERE guildId = ${message.guild.id}`);
            message.channel.send("I have enabled botlock commands can now only be used in " + newprefix + ".")
            let modlog = message.guild.channels.find('name', row.logschannel);
             const embed = new Discord.RichEmbed()
               .setColor(0x00A2E8)
               .setTitle("Case #" + row.casenumber + " | Action: Bot Lock Enabled")
               .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
               .addField("Channel", newprefix, true)
               .setFooter("Time used: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
           return client.channels.get(modlog.id).send({embed});
         } else {
     sql.run(`UPDATE scores SET botlock = "disabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
     message.channel.send("I have disabled botlock commands can now used in any channel." + newprefix)
     let modlog = message.guild.channels.find('name', row.logschannel);
      const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setTitle("Case #" + row.casenumber + " | Action: Bot Lock Disabled")
        .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
        .setFooter("Time used: " + message.createdAt.toDateString())
      if (!modlog) return;
      if (row.logsenabled === "disabled") return;
    return client.channels.get(modlog.id).send({embed});
         }
    })
}