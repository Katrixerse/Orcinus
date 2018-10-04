const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
     if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You are missing MANAGE_GUILD permission");
     const newprefix = args[0]
     const newprefixfix = newprefix.replace(/[^\x00-\x7F]/g, "");
     if (newprefix.length < 1) return message.channel.send("Didn't provide a new prefix to set")
     if (newprefixfix.length < 1) return message.channel.send("Prefix can't have ascii characters")
     if (newprefix.length > 7) return message.channel.send("prefix can't be longer then 7 characters")
     sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
     sql.run(`UPDATE scores SET prefix = "${newprefixfix}", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
     message.channel.send("I have set the new guild prefix to " + newprefix)
     let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
      const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setTitle("Case #" + row.casenumber + " | Action: Prefix Change")
        .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
        .addField("New prefix", newprefixfix, true)
        .setFooter("Time used: " + message.createdAt.toDateString())
      if (!modlog) return;
      if (row.logsenabled === "disabled") return;
    return client.channels.get(modlog.id).send({embed});
    })
}
