const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
const fs = require("fs")
const version = "v11.3.2"
exports.run = (client, message, args) => {
      fs.readdir("./commands/", (err, files) => {
       const filez = files.length
       if (err) return console.error(err);
       sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
       if (!row) return;
      const embed = new Discord.RichEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .setColor(0x00A2E8)
            .addField("Memory", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + "MBS", true)
            .addField("Commands:", `${filez + 11}`)
            .addField('Total Users', `${client.users.size}`, true)
            .addField('Total Channels:', `${client.channels.size}`, true)
            .addField('Total Servers', Math.ceil(client.guilds.size), true)
            .addField('Bot Created', client.user.createdAt.toLocaleString())
            .addField('Library', `discord.js ${version}`, true)
            .addField('Node.js Version', process.version, true)
            .addField('Bot Version', "0.9.6.4", true)
            .setTimestamp()
            .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({embed}) 
            })
      })
 }
   
