const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
var y = "";
exports.run = async (client, message, args) => {
    try {
    const redeemcode = args.join("")
    if (redeemcode === "free10k") {
        if (y.includes(message.author.id)) return message.channel.send("You have already redeemed this code, follow orcinus on twitter for more codes: \nhttps://twitter.com/OrcinusBot")
        y += `${message.author.id}, `;
        console.log(y)
        sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
        sql.run(`UPDATE profiles SET cash = ${row.cash += 10000} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
        message.channel.send("Code has been redeemed i have added 10k to your cash, see https://twitter.com/OrcinusBot for more codes")
        })
    }
    } catch (err)  {
        message.channel.send("Error happened please report this to the dev: " + err)
    }
}