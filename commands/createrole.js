const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('Sorry, i dont have the perms to do this cmd i need MANAGE_ROLES. :x:')
     if (message.member.hasPermission("MANAGE_ROLES")) {
         sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
            const prefixtouse = row.prefix
            const usage = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Command: " + prefixtouse + "createrole")
            .addField("Usage", prefixtouse + "createrole <rolename> <rolecolor>")
            .addField("Example", prefixtouse + "createrole Mods 0x0F01A0")
            .setDescription("Description: " + "Creates a new role in the current server");

            let guild = message.member.guild;
            let rolename = args[0]
            let color2 = args[1] || `FFFFFF`;
            let reason = args[2] || `Moderator didn't give a reason.`;
            console.log(rolename + " | " + color2 + " was created")
            if (rolename.length < 1) return message.channel.send(usage)
            if (color2.length < 1) return message.channel.send(usage)
            guild.createRole({
                name: `${rolename}`,
                color: `${color2}`
            });
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
            message.reply("I have made the role: " + rolename + " with the color: " + color2);
            sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
            const embed = new Discord.RichEmbed()
             .setColor(0x00A2E8)
             .setTitle("Case #" + row.casenumber + " | Action: Created Role")
             .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
             .addField("User", user.user.tag + " (ID: " + user.user.id + ")")
             .addField("In channel", message.channel.name, true)
             .addField("Reason", reason, true)
             .setFooter("Time used: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
             client.channels.get(modlog.id).send({embed});
         })
    }
}
   
