const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Need MANAGE_GUILD permission to use this command.")
    const user = message.mentions.users.first();
     if (message.mentions.users.size < 1) {
        const amount = parseInt(args[0]);
        if (amount < 1) return message.channel.send("Didnt provide any xp to give.");
        if (amount >= 9999999) return message.channel.send("Max xp to give is 9999999")
        sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row2 => {
            if (!row2) message.channel.send("You needs to start talking first.")
            if (row2.xp >= 9999999) return message.channel.send("Max xp is 9999999")
               if (isNaN(amount)) return message.channel.send("Not a valid number")
               sql.run(`UPDATE profiles SET xp = ${row2.xp += amount}, username = "${message.author.username}" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
               message.channel.send("I have given xp to: " + message.author.username + " " + amount + "XP");
        })
     } else {
     const amount = parseInt(args[1]);
     if (amount < 1) return message.channel.send("Didnt provide any xp to give.");
     if (amount >= 9999999) return message.channel.send("Max xp to give is 9999999")
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row => {
     if (!row) message.channel.send("User needs to start talking first.")
     if (row.xp >= 9999999) return message.channel.send("Max xp is 9999999")
        if (amount >= 999999) return message.channel.send("Max xp to give is $999999")
        if (isNaN(amount)) return message.channel.send("Not a valid number")
        sql.run(`UPDATE profiles SET xp = ${row.xp += amount} WHERE guildId ="${message.guild.id}" AND userId = ${user.id}`);
        message.channel.send("I have given xp to: " + user.username + " " + amount + "XP");
        })
    }
}

