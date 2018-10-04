const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
     if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You are missing MANAGE_GUILD permission");
     sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
         if (row.levelsystem === "disabled") {
            sql.run(`UPDATE scores SET levelsystem = "enabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("I have enabled levels/xp/cash in this guild")
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
             const embed = new Discord.RichEmbed()
               .setColor(0x00A2E8)
               .setTitle("Case #" + row.casenumber + " | Action: Profile System Enabled")
               .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
               .setFooter("Time used: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
           return client.channels.get(modlog.id).send({embed}).catch(console.error);
         } else {
            sql.run(`UPDATE scores SET levelsystem = "disabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("I have disabled levels/xp/cash in this guild")
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
             const embed = new Discord.RichEmbed()
               .setColor(0x00A2E8)
               .setTitle("Case #" + row.casenumber + " | Action: Profile System Disabled")
               .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
               .setFooter("Time used: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
           return client.channels.get(modlog.id).send({embed}).catch(console.error);
         }
    })
}
