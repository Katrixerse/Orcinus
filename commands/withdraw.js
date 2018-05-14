const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
        let transferamount = parseInt(args[0]);
        if (transferamount <= 1) return message.channel.send("You can't withdraw anything below 1");
        if (isNaN(transferamount)) return message.channel.send("Not a valid number to withdraw");
        let taxtransfer = (transferamount / 100) * 95;
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                if (!row) return message.channel.nend("Have no money in the bank to withdraw need to start talking first.")
                if (row.bank < transferamount) return message.channel.send("You dont have enough money to withdraw that much, you have: $" + row.bank);
                sql.run(`UPDATE profiles SET cash = ${row.cash += taxtransfer} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                sql.run(`UPDATE profiles SET bank = ${row.bank -= transferamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                message.channel.send("I have successfully withdrawal $" + taxtransfer + ", from your bank, there was a 5% fee your new balance: $" + row.cash + ".")
            })
}
