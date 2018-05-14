const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
    const usage = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setThumbnail(client.user.avatarURL)
    .addField("Usage: ", "h!roll <number> <amount/bet>")
    .addField("Example: ", "h!roll 50 1000");
    var dice = Math.floor(Math.random() * 85.99 + 1);
    var number = parseInt(args.join(''));
    const wonamount = (Math.round(number * 1.75))
    if (number.length < 1) return message.channel.send(usage);
    if (row.cash < number) return message.channel.send("You dont have enough money to bet that much, you have: $" + row.cash);
    if (number < -0) return message.channel.send("You can't bet anything below 0: you bet $" + number)
    if (!isFinite(number)) return message.channel.send("is not a valid number to bet")
    if (isNaN(number)) return message.channel.send(number + "is not a valid number to bet");
    if (number.length > 6) return message.channel.send("Can not bet more then 6 numbers at a time")
    if (dice >= "75") {
      const embed = new Discord.RichEmbed()
      .setColor(0x00A2E8)
      .setTimestamp()
      .setTitle("The dice has rolled: " + dice)
      .setDescription("You have won $" + wonamount + "!")
      .setThumbnail("http://www.pngall.com/wp-content/uploads/2016/04/Dice-Free-Download-PNG.png")
      sql.run(`UPDATE profiles SET cash = ${row.cash += wonamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
      message.channel.send(embed).catch(console.error);
        } else {
        const embed2 = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setTimestamp()
        .setTitle("The dice has rolled: " + dice)
        .setDescription("You have lost $" + number + "!")
        .setThumbnail("http://www.pngall.com/wp-content/uploads/2016/04/Dice-Free-Download-PNG.png")
        sql.run(`UPDATE profiles SET cash = ${row.cash -= number} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
        message.channel.send(embed2).catch(console.error);
        }
    })
}
