const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You're missing MANAGE_GUILD permission");
    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('Sorry, i dont have the perms to do this cmd i need MANAGE_ROLES. :x:')
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
    const prefixtouse = row.prefix
    const embed10 = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Command: " + prefixtouse + "autorole")
            .addField("Usage", prefixtouse + "autorole [enable/disable] [role name]")
            .addField("Example", prefixtouse + "autorole enable Members")
            .setDescription("Description: " + "Enables/disables auto role on join.");

      const optiontopick = args[0]
      if (optiontopick === "enable") {
            let roletogive = args.slice(1).join(" ")
            const roletogivefix = roletogive.replace(/[^\x00-\x7F]/g, "");
                    const prefixtouse = row.prefix
        if (roletogive.length < 1) return message.channel.send(usage)

        sql.run(`UPDATE scores SET autoroleenabled = "enabled", roletogive = "${roletogivefix}", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
        message.channel.send("Members will now get the role " + roletogivefix + " when they join the guild from now on.")

        let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
        const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle("Case #" + row.casenumber + " | Action:  Auto Role Enabled")
            .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
            .addField("Role to give", roletogivefix, true)
            .setFooter("Time used: " + message.createdAt.toDateString())

        if (!modlog) return;
        if (row.logsenabled === "disabled") return;
        return client.channels.get(modlog.id).send({embed});
  } else if (optiontopick === "disable") {
        sql.run(`UPDATE scores SET autoroleenabled = "disabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
    message.channel.send("I have disabled auto role for this guild.")

    let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
    const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setTitle("Case #" + row.casenumber + " | Action:  Auto Role Disabled")
        .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
        .setFooter("Time used: " + message.createdAt.toDateString())
    if (!modlog) return;
    if (row.logsenabled === "disabled") return;
    return client.channels.get(modlog.id).send({embed});
        } else {
            message.channel.send(embed10)
        }
    })
}
