const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
        const user = message.mentions.users.first();
        if (message.mentions.users.size < 1) return message.channel.send("Need to tag a user to transfer money to them.")
        let transferamount = parseInt(args.slice(1).join(' '));
        let taxtransfer = (transferamount / 100) * 80;
        let taxtransferz = (transferamount / 100) * 20;
        if (transferamount <= 1) return message.channel.send("You can't give anything below 1");
        if (isNaN(transferamount)) return message.channel.send("Not a valid number");
        if (user.id === message.author.id) return message.channel.send("Can't transfer money to yourself")
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                    if (!row) return message.channel.nend("Have no money need to start talking first.")
                if (row.cash < transferamount) return message.channel.send("You dont have enough money to transfer that much, you have: $" + row.cash);
                sql.run(`UPDATE profiles SET cash = ${row.cash -= transferamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                message.channel.send("I have successfully transfered $" + taxtransfer + ", to " + user.username + ". Transaction fee: $" + taxtransferz + ", New balance: $" + row.cash + ".")
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row2 => {
                 if (!row2) return message.channel.nend("Have no money need to start talking first.")
                    sql.run(`UPDATE profiles SET cash = ${row2.cash += taxtransfer} WHERE guildId ="${message.guild.id}" AND userId = ${user.id}`);
            })
          })
}
