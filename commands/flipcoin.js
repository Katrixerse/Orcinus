const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
  try {
    var number = parseInt(args[0]);
    const wonamount = (Math.round(number * 1.25))
    var headsortails = args.slice(1).join("")
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
      var coinflips = ['Heads!','Tails!'];
      const coinflip = coinflips[Math.floor(Math.random () * coinflips.length)];
      if (coinflip === 'Heads!' && headsortails === "heads") {
        sql.run(`UPDATE profiles SET cash = ${row.cash += wonamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
        message.channel.send("Coin flipped and it landed on heads and you win $" + wonamount + ".")
      } else if (coinflip === 'Heads!' && headsortails === "tails") {
        sql.run(`UPDATE profiles SET cash = ${row.cash -= number} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
        message.channel.send("Coin flipped and it landed on heads and you lose $" + number + ".")
      } else if (coinflip === 'Tails!' && headsortails === "tails") {
        sql.run(`UPDATE profiles SET cash = ${row.cash += wonamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
        message.channel.send("Coin flipped and it landed on tails and you win $" + wonamount + ".")
      } else if (coinflip === 'Tails!' && headsortails === "heads") {
        sql.run(`UPDATE profiles SET cash = ${row.cash -= number} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
        message.channel.send("Coin flipped and it landed on tails and you lose $" + number + ".")
      } else {
        message.channel.send("That option wasnt found, command usage >flipcoin [bet] [heads/tails]")
      }
    })
  } catch (err) {
    console.log(err)
  } 
}
   
