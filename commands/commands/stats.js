const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
        if (!row) return message.channel.send("You do not have a level yet, talk some more.")
      }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, level INTEGER, br INTEGER, vip INTEGER, dungeon INTEGER)").then(() => {
          sql.run("INSERT INTO scores (userId, level, br, vip, dungeon) VALUES (?, ?, ?)", [message.author.id, 1, 0, 0, 1]);
        });
      });
      const embed = new Discord.RichEmbed()
        .setTitle("RPG stats for: " + message.author.username)
        .addField("Level", "100")
        .addField("BR", "2056598645", true)
        .addField("Vip", "20")
        .addField("Dungeon", "151")

}