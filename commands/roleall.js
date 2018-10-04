const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You're missing MANAGE_ROLES permission")
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
        var userz = message.guild.members.array();
        const roletogive = args.join(" ")
        let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
        let subscriberRole = client.guilds.get(message.guild.id).roles.find(r => r.name == roletogive);
        if (!subscriberRole) return message.channel.send("I can not find the role " + roletogive + " :x:");

        if (row.logsenabled === 'disabled') {
            try {
                userz.forEach(u => {
                    u.addRole(subscriberRole)
                })
                message.channel.send("I have given the role " + roletogive + " to all members.")
            } catch (err) {
                return;
            }
        } else {
    sql.run(`UPDATE scores SET logsenabled = "disabled" WHERE guildId = ${message.guild.id}`);
    try {
        userz.forEach(u => {
            u.addRole(subscriberRole)
        })
        message.channel.send("I have given the role " + roletogive + " to all members.")
        const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle("Case #" + row.casenumber + " | Action: Give Role All")
            .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
            .addField("Role Given:", roletogive)
            .setFooter("Time used: " + message.createdAt.toDateString())
   if (!modlog) return;
   sql.run(`UPDATE scores SET logsenabled = "enabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
     return client.channels.get(modlog.id).send({embed});
    } catch (err) {
        return;
    }
}
    })
}
