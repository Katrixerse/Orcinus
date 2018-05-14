const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    var dice = Math.floor(Math.random() * 1000);
    if (dice <= 500) {
        message.channel.send("You got a common chest please wait 24 hours to claim another.")
    } else if (dice >= 500 && dice <= 750) {
        message.channel.send("You got a uncommon chest please wait 24 hours to claim another.")
    } else if (dice >= 751) {
        message.channel.send("You got a rare chest please wait 24 hours to claim another.")
    }
}