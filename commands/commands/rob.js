const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
        const user = message.mentions.users.first();
        if (message.mentions.users.size < 1) return message.channel.send("Need to tag a user to rob them.")
        if (user.id === message.author.id) return message.channel.send("You can't rob money from yourself")
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row2 => {
                if (!row) return message.channel.nend("Have no money need to start talking first.")
                if (!row2) return message.channel.nend("User has no money need to earn some before you can rob them.")
                if (row2.cash < 0) return message.channel.send("User has no money to rob them.")
                var dice = Math.floor(Math.random() * 99 + 1);
                var dice2 = Math.floor(Math.random() * row2.cash);
                var dice3 = Math.floor(Math.random() * 1000 + 1);
                if (dice >= "75") {
                    sql.run(`UPDATE profiles SET cash = ${row.cash += dice2} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                    sql.run(`UPDATE profiles SET cash = ${row2.cash -= dice2} WHERE guildId ="${message.guild.id}" AND userId = ${user.id}`);
                    message.channel.send("You have successfully robbed $" + dice2 + ", from " + user.username + ", New balance: $" + row.cash + ".")
                } else {
                    sql.run(`UPDATE profiles SET cash = ${row.cash -= dice3} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                    message.channel.send("You were caught trying to rob " + user.username + ", and you payed a fine of: $" + dice3 + ", New balance: $" + row.cash + ".")
                }
            })
          })
}
