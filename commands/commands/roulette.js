const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
        const choice = args[0]
        let transferamount = parseInt(args.slice(1).join(' '));
        if (transferamount <= 1) return message.channel.send("You can't bet anything below 1.");
        if (isNaN(transferamount)) return message.channel.send("Not a valid number.");
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                if (!row) return message.channel.send("Need to start talking first.")
                if (row.cash < transferamount) return message.channel.send("You dont have enough money to bet that much, you have: $" + row.cash);
                var dice = Math.floor(Math.random() * 35 + 1);
                const wonamount = (Math.round(transferamount * 1.25))
                if (choice === "odd") {
                    if (dice & 1)
                    {
                        // ODD
                        message.channel.send("The roulette ball landed on " + dice + " and you won $" + wonamount)
                        sql.run(`UPDATE profiles SET cash = ${row.cash += wonamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                    }
                        else
                    {
                        // EVEN
                        message.channel.send("The roulette ball landed on " + dice + " and you lost $" + transferamount)
                        sql.run(`UPDATE profiles SET cash = ${row.cash -= transferamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                    }
                } else if (choice === "even") {
                    if (dice & 1)
                    {
                        // ODD
                        message.channel.send("The roulette ball landed on " + dice + " and you lost $" + transferamount)
                        sql.run(`UPDATE profiles SET cash = ${row.cash -= transferamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                    }
                        else
                    {
                        // EVEN
                        message.channel.send("The roulette ball landed on " + dice + " and you won $" + wonamount)
                        sql.run(`UPDATE profiles SET cash = ${row.cash += wonamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                    }
                } else {
                    message.channel.send("Not a valid choice either even or odd")
                }
            
          })
}
