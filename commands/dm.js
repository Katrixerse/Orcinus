const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Missing permissions to dm this user with the bot.`)
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
    const prefixtouse = row.prefix
    const usage = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Command: " + prefixtouse + "dm")
            .addField("Usage", prefixtouse + "dm @Someone <message>")
            .addField("Example", prefixtouse + "dm @Dowin Hey can you help me with something?")
            .setDescription("Description: " + "Bot dms a user with your message ");
  
            try {
            let who = message.mentions.users.first()
            if (message.mentions.users.size < 1) return message.channel.send(usage);
            if (message.author.id == who.id) return message.channel.send(`:x: Well no you can't dm yourself.`);
            message2 = args.slice(1).join(` `);
            if (message2 >= 400) return message.channel.send(usage)
                who.send('**Message from ' + message.author.username + '**: ' + message2)
                    message.channel.send(`Sucessfully sent message to ${who.username}.`)
            } catch (err) {
                return;
            }
            })
    }         
   
