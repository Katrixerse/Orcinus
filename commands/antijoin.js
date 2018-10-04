const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
     if (message.member.hasPermission("BAN_MEMBERS")) {
         sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
            const reason = args.join(" ") || `Moderator didn't give a reason.`;
            if (row.antijoin === "disabled") {
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
            sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1}, antijoin = "enabled" WHERE guildId = ${message.guild.id}`);
            message.channel.send("Anti-join has been enabled.")
            const embed = new Discord.RichEmbed()
             .setColor(0x00A2E8)
             .setTitle("Case #" + row.casenumber + " | Action: Anti Join on")
             .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
             .addField("In channel", message.channel.name, true)
             .addField("Reason", reason, true)
             .setFooter("Time used: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
             client.channels.get(modlog.id).send({embed});
            } else {
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
            sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1}, antijoin = "disabled" WHERE guildId = ${message.guild.id}`);
            message.channel.send("Anti-join has been disabled.")
            const embed = new Discord.RichEmbed()
             .setColor(0x00A2E8)
             .setTitle("Case #" + row.casenumber + " | Action: Anti Join off")
             .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
             .addField("In channel", message.channel.name, true)
             .addField("Reason", reason, true)
             .setFooter("Time used: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
             client.channels.get(modlog.id).send({embed}).catch(console.error);
            }
         })
    }
}
   
