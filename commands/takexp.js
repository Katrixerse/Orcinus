const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    const user = message.mentions.users.first();
     if (message.mentions.users.size < 1) return message.channel.send("Need to tag a user to take xp from them.");
     const amount = parseInt(args[1]);
     if (amount < 1) return message.channel.send("Didnt provide any money to give.");
     if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Need MANAGE_GUILD permission to use this command.")
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row => {
     if (!row) message.channel.send("User needs to start talking first.")
        if (isNaN(amount)) return message.channel.send("Not a valid number")
        sql.run(`UPDATE profiles SET xp = ${row.xp -= amount} WHERE guildId ="${message.guild.id}" AND userId = ${user.id}`);
		message.channel.send("I have taken xp from: " + user.username + " " + amount + "XP");
    })
}
