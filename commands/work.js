const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
const talkedRecently = new Set();
exports.run = (client, message, args) => {
    if (talkedRecently.has(message.author.id)) return message.channel.send("You already worked in the last 10 mins please wait.")
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                if (!row) return;
                var dice = Math.floor(Math.random() * 120 + 1);
                    sql.run(`UPDATE profiles SET cash = ${row.cash += dice} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                    message.channel.send("You worked for the day and earned: $" + dice +", new balance: $" + row.cash + ", you can work again in 10 minutes.")
                    talkedRecently.add(message.author.id);
                    setTimeout(() => {
                        talkedRecently.delete(message.author.id);
                    }, 10 * 60000);
          })
}
