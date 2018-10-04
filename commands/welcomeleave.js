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
        .setTitle("Command: " + prefixtouse + "welcomeleave")
	    .addField("Usage", prefixtouse + "welcomeleave [number] [text]")
        .addField("Options", "[1] - Enable welcome/leave messages\n[2] - Disable welcome/leave messages\n[3] - Set welcome/level channel\n[4] - Set welcome message\n[5] - Set leave message\n[6] - Enable dm welcome/leave messages\n[7] - Disable dm welcome/leave messages\n")
        .addField("Place Holders", "%MENTION% - Will mention the user.\n%GUILDNAME% - Will say the guild name.\n%NAME% - Will say the users name.\n%MEMBERCOUNT% - Will say the current membercount")
        .addField("Example", prefixtouse + "welcomeleave 3 Welcome to %GUILDNAME%, %MENTION% has joined us.")
        .setDescription("Description: " + "Used to set the welcome/leave system.");

        const numberpicked = parseInt(args[0])
        const newsomething = args.slice(1).join(' ');
        if (isNaN(numberpicked)) return message.channel.send(embed10)
        if (numberpicked === 1) {
            if (row.wlsystem === "enabled") return message.channel.send("Welome/leave messages have already been enabled")
            sql.run(`UPDATE scores SET wlsystem = "enabled" WHERE guildId = ${message.guild.id}`);
            message.channel.send("I have enabled welcome/leave messages for this guild.")
        } else if (numberpicked === 2) {
            if (row.wlsystem === "disabled") return message.channel.send("Welome/leave messages have already been disabled")
            sql.run(`UPDATE scores SET wlsystem = "disabled" WHERE guildId = ${message.guild.id}`);
            message.channel.send("I have disabled welcome/leave messages for this guild.")
        } else if (numberpicked === 3) {
            if (newsomething < 1) return message.channel.send(embed10)
            const newwlchannelfix = newsomething.replace(/[^\x00-\x7F]/g, "");
            if (newsomething.length < 1) return message.channel.send("Didn't provide a new channel to set")
            if (newwlchannelfix.length < 1) return message.channel.send("channel can't have non-ascii characters")
            if (newsomething.length > 25) return message.channel.send("channel can't be longer then 25 characters")
            sql.run(`UPDATE scores SET wlchannel = "${newwlchannelfix}", casenumber = ${row.casenumber +1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("I have set the new guild welcome channel to " + newwlchannelfix)
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
             const embed = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Case #" + row.casenumber + " | Action: Welcome Channel Changed")
                .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
                .addField("New Channel", newwlchannelfix, true)
                .setFooter("Time used: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
             client.channels.get(modlog.id).send({embed});
        } else if (numberpicked === 4) {
            if (newsomething < 1) return message.channel.send(embed10)
            const newwelcomemessagefix = newsomething.replace(/[^\x00-\x7F]/g, "");
            if (newsomething.length < 1) return message.channel.send("Didn't provide a new message to set")
            if (newwelcomemessagefix.length < 1) return message.channel.send("Leave message can't have non-ascii characters")
            if (newsomething.length > 400) return message.channel.send("Welcome message can't be longer then 400 characters")
            sql.run(`UPDATE scores SET welcomemessage = "${newwelcomemessagefix}", casenumber = ${row.casenumber +1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("I have set the new guild welcome message to " + newwelcomemessagefix)
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
             const embed = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Case #" + row.casenumber + " | Action: Welcome Message Changed")
                .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
                .addField("New Message", newwelcomemessagefix, true)
                .setFooter("Time used: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
           client.channels.get(modlog.id).send({embed});
        } else if (numberpicked === 5) {
            if (newsomething < 1) return message.channel.send(embed10)
            const newleavemessagefix = newsomething.replace(/[^\x00-\x7F]/g, "");
            if (newsomething.length < 1) return message.channel.send("Didn't provide a new message to set")
            if (newleavemessagefix.length < 1) return message.channel.send("Leave message can't have non-ascii characters")
            if (newsomething.length > 400) return message.channel.send("Leave message can't be longer then 400 characters.")
            sql.run(`UPDATE scores SET leavemessage = "${newleavemessagefix}", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("I have set the new guild leave message to " + newleavemessagefix)
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
             const embed = new Discord.RichEmbed()
           .setColor(0x00A2E8)
           .setTitle("Case #" + row.casenumber + " | Action: Leave Message Changed")
           .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
           .addField("New Message", newleavemessagefix, true)
           .setFooter("Time used: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
           client.channels.get(modlog.id).send({embed});
        } else if (numberpicked === 6) {
            sql.run(`UPDATE scores SET dmmessage = "enabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("I have made it welcome/leave messages will go to dms.")
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
             const embed = new Discord.RichEmbed()
           .setColor(0x00A2E8)
           .setTitle("Case #" + row.casenumber + " | Action: Enabled welcome/leave in dms")
           .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
           .setFooter("Time used: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
           client.channels.get(modlog.id).send({embed});
        } else if (numberpicked === 7) {
            sql.run(`UPDATE scores SET dmmessage = "disabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("I have made it welcome/leave messages will go to the channel.")
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
             const embed = new Discord.RichEmbed()
           .setColor(0x00A2E8)
           .setTitle("Case #" + row.casenumber + " | Action: Enabled welcome/leave in dms")
           .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
           .setFooter("Time used: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
           client.channels.get(modlog.id).send({embed});
        } else {
            message.channel.send("Did not select valid options")
        }
    })
}
