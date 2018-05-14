const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
const talkedRecently = new Set();
exports.run = (client, message, args) => {
    if (talkedRecently.has(message.author.id)) return message.channel.send("You already hacked in the last 15 mins please wait.")
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                if (!row) return;
                var dice = Math.floor(Math.random() * 1000 + 1);
                var dice2 = Math.floor(Math.random() * 3);
                var dice3 = Math.floor(Math.random() * 400 + 1);
                var possiblethingstohack = ["the bank", "Mr. Robot", "a server", "the casino", "ken's computer"];
                if (dice2 >= 2) {
                    message.channel.send("You were caught trying to hack " + possiblethingstohack[Math.floor(Math.random () * possiblethingstohack.length)] + " and paid a fine of: $" + dice3)
                    sql.run(`UPDATE profiles SET cash = ${row.cash -= dice3} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                } else {
                    sql.run(`UPDATE profiles SET cash = ${row.cash += dice} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                    message.channel.send("You successfully hacked " + possiblethingstohack[Math.floor(Math.random () * possiblethingstohack.length)] + " and earned $" + dice + " from it, you can hack again in 15 mins")
                    talkedRecently.add(message.author.id);
                    setTimeout(() => {
                        talkedRecently.delete(message.author.id);
                    }, 15 * 60000);
                }
          })
}
