const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = async (client, message, args) => {
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
        const prefixtouse = row.prefix
        const usage = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Command: " + prefixtouse + "warn")
            .addField("Usage", prefixtouse + "warn @Someone <reason>")
            .addField("Example", prefixtouse + "warn @Someone for ad links to other discords")
            .setDescription("Description: " + "warn a user from the current server");

        if (!message.member.hasPermission("KICK_MEMBERS")) return;
        if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Sorry, i dont have the perms to do this cmd i need KICK_MEMBERS. :x:')
        let reason = args.slice(1).join(' ');
        if (reason.length < 1) return message.channel.send(usage)
        if (reason.length > 70) return message.channel.send(`Reasons cant be longer then 70 characters`)
        let user2 = message.mentions.users.first();
        sql.get(`SELECT * FROM warnings WHERE guildId ="${message.guild.id}" AND userId ="${user2.id}"`).then(row => {
            if (!row) {
                sql.run("INSERT INTO warnings (guildId, userId, userwarnings, reasons) VALUES (?, ?, ?, ?)", [message.guild.id, user2.id, 2, `1. ${reason} by: ${message.author.tag}`]);
            }
        }).catch(() => {
            sql.run("CREATE TABLE IF NOT EXISTS warnings (guildId TEXT, userId TEXT, userwarnings INTEGER, reasons TEXT)").then(() => {
                sql.run("INSERT INTO warnings (guildId, userId, userwarnings, reasons) VALUES (?, ?, ?, ?)", [message.guild.id, user2.id, 2, `1. ${reason} by: ${message.author.tag}`]);
            })
        })
    if (message.mentions.users.size < 1) return message.channel.send(usage)
    let user = message.guild.member(message.mentions.users.first())
    if (user.highestRole.position >= message.member.highestRole.position) return message.reply('I cant warn that member. They are the same level as you or higher. :x:')
    let user3 = message.mentions.users.first();
    let reason2 = args.slice(1).join(' ');
    message.channel.send("***" + user3.username + " has been successfully warned! :white_check_mark:***")
    user3.send("You have recieved a warning from: " + message.author.username + " for: " + reason2)
    sql.get(`SELECT * FROM warnings WHERE guildId ="${message.guild.id}" AND userId ="${user3.id}"`).then(row => {
        if (row.userwarnings >= 99) return message.channel.send("Have hit the max giveable warnings for this user, please use >clearwarns @Someone to remove their warnings.")
        sql.run(`UPDATE warnings SET userwarnings = ${row.userwarnings + 1}, reasons = "${row.reasons} \n${row.userwarnings}. ${reason2} by: ${message.author.tag}" WHERE guildId = ${message.guild.id} AND userId = ${user3.id}`);
    })
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
        sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
        let modlog = message.guild.channels.find(channel => channel.name == row.logschannel)
        let reason3 = args.slice(1).join(' ');
        const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle("Case #" + row.casenumber + " | Action: Warn")
            .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
            .addField("User", user3.tag + " (ID: " + user3.id + ")")
            .addField("Reason", reason3, true)
            .setFooter("Time used: " + message.createdAt.toDateString())
        if (!modlog) return;
        if (row.logsenabled === "disabled") return;
        client.channels.get(modlog.id).send({embed});
    })
    })
}
