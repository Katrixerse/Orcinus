const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You're missing MANAGE_GUILD permission");
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {

  const prefixtouse = row.prefix
        const embed10 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setThumbnail(client.user.avatarURL)
                .setTitle("Command: " + prefixtouse + "logs")
                .addField("Usage", prefixtouse + "logs [number]")
                .addField("Example", "[1] - Enable logs\n[2] - Disable logs\n[3] - Change logs channel")
                .setDescription("Description: " + "Used to configure the bots moderation logs.");

        const toenable = args[0]
        if (toenable === "1") {
            sql.run(`UPDATE scores SET logsenabled = "enabled" WHERE guildId = ${message.guild.id}`);
            message.channel.send("I have enabled logs for this guild.")
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
            const embed = new Discord.RichEmbed()
          .setColor(0x00A2E8)
          .setTitle("Case #" + row.casenumber + " | Action: Logs Enabled")
          .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
          .setFooter("Time used: " + message.createdAt.toDateString())
            if (!modlog) return;
            if (row.logsenabled === "disabled") return;
            client.channels.get(modlog.id).send({embed});
        } else if (toenable === "2") {
            sql.run(`UPDATE scores SET logsenabled = "disabled" WHERE guildId = ${message.guild.id}`);
            message.channel.send("I have disabled logs for this guild.")
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
            const embed = new Discord.RichEmbed()
          .setColor(0x00A2E8)
          .setTitle("Case #" + row.casenumber + " | Action: Logs Disabled")
          .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
          .setFooter("Time used: " + message.createdAt.toDateString())
            if (!modlog) return;
            if (row.logsenabled === "disabled") return;
            client.channels.get(modlog.id).send({embed});
        } else if (toenable === "3") {
          const newlogs = args.slice(1).join(' ')
          const newlogschannel = newlogs.replace(/[^\x00-\x7F]/g, "");
          if (newlogs.length < 1) return message.channel.send("Didn't provide a new channel name to set")
          if (newlogschannel.length < 1) return message.channel.send("Prefix can't have non-ascii characters")
          if (newlogs.length > 20) return message.channel.send("channel name can't be longer then 20 characters")
          if (!row.logschannel) return;
          sql.run(`UPDATE scores SET logschannel = "${newlogschannel}", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
          message.channel.send("I have set the new guild logs channel to " + newlogschannel)
          let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
           const embed = new Discord.RichEmbed()
         .setColor(0x00A2E8)
         .setTitle("Case #" + row.casenumber + " | Action: Logs Channel Change")
         .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
         .addField("New logs channel", newlogschannel, true)
         .setFooter("Time used: " + message.createdAt.toDateString())
           if (!modlog) return;
           if (row.logsenabled === "disabled") return;
           client.channels.get(modlog.id).send({embed});
        } else {
           message.channel.send(embed10)
        }
    })
}
