const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
        let transferamount = parseInt(args[0]);
        if (transferamount <= 1) return message.channel.send("You can't deposit anything below 1");
        if (isNaN(transferamount)) return message.channel.send("Not a valid number to deposit");
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                if (!row) return message.channel.nend("Have no cash to deposit need to start talking first.")
                if (row.cash < transferamount) return message.channel.send("You dont have enough money to deposit that much, you have: $" + row.cash);
                sql.run(`UPDATE profiles SET cash = ${row.cash -= transferamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                sql.run(`UPDATE profiles SET bank = ${row.bank += transferamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                message.channel.send("I have successfully deposited $" + transferamount + ", to your bank, New balance: $" + row.cash + ".")
            })
}
