const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Need MANAGE_GUILD permission to use this command.")
    const user = message.mentions.users.first();
     if (message.mentions.users.size < 1) {
        const amount = parseInt(args[0]);
        if (amount < 1) return message.channel.send("Didnt provide any money to give.");
        sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row2 => {
            if (!row2) message.channel.send("You needs to start talking first.")
            const doingmath = row2.cash + row2.bank
               if (doingmath >= 999999) return message.channel.send("Max money is $999999")
               if (amount >= 999999) return message.channel.send("Max money to give is $999999")
               if (isNaN(amount)) return message.channel.send("Not a valid number")
               sql.run(`UPDATE profiles SET cash = ${row2.cash += amount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
               message.channel.send("I have given money to: " + message.author.username + " $" + amount);
        })
     } else {
     const amount = parseInt(args[1]);
     if (amount < 1) return message.channel.send("Didnt provide any money to give.");
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row => {
     if (!row) message.channel.send("User needs to start talking first.")
     const doingmath = row.cash + row.bank
        if (doingmath >= 999999) return message.channel.send("Max money is $999999")
        if (amount >= 999999) return message.channel.send("Max money to give is $999999")
        if (isNaN(amount)) return message.channel.send("Not a valid number")
        sql.run(`UPDATE profiles SET cash = ${row.cash += amount} WHERE guildId ="${message.guild.id}" AND userId = ${user.id}`);
        message.channel.send("I have given money to: " + user.username + " $" + amount);
        })
    }
}
