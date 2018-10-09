const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");

module.exports = async (client, message) => {
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO scores (guildId, prefix, casenumber, autoroleenabled, roletogive, logsenabled, logschannel, automoderation, wlchannel, wlsystem, welcomemessage, leavemessage, dmmessage, slowmode, slowmodetime, invitelinkprotection, websitelinkprotection, dupcharactersprotection, antijoin, modonlycommands, botlock, botlockchannel, levelsystem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [message.guild.id, ">", 1, "enabled", "none", "enabled", "logs", "disabled", "welcome", "disabled", "Hello %MENTION%, welcome to %GUILDNAME%.", "%NAME% has left the guild", "disabled", "disabled", 3, "disabled", "disabled", "disabled", "disabled", "disabled", "disabled", "bot-commands", "disabled"]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS scores (guildId TEXT, prefix TEXT, casenumber INTEGER, autoroleenabled TEXT, roletogive TEXT, logsenabled TEXT, logschannel TEXT, automoderation TEXT, wlchannel TEXT, wlsystem TEXT, welcomemessage TEXT, leavemessage TEXT, dmmessage TEXT, slowmode TEXT, slowmodetime INTEGER, invitelinkprotection TEXT, websitelinkprotection TEXT, dupcharactersprotection TEXT, antijoin TEXT, modonlycommands TEXT, botlock TEXT, botlockchannel TEXT, levelsystem TEXT)").then(() => {
          sql.run("INSERT INTO scores (guildId, prefix, casenumber, autoroleenabled, roletogive, logsenabled, logschannel, automoderation, wlchannel, wlsystem, welcomemessage, leavemessage, dmmessage, slowmode, slowmodetime, invitelinkprotection, websitelinkprotection, dupcharactersprotection, antijoin, modonlycommands, botlock, botlockchannel, levelsystem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [message.guild.id, ">", 1, "enabled", "none", "enabled", "logs", "disabled", "welcome", "disabled", "Hello %MENTION%, welcome to %GUILDNAME%.", "%NAME% has left the guild", "disabled", "disabled", 3, "disabled", "disabled", "disabled", "disabled", "disabled", "disabled", "bot-commands", "disabled"]);
      })
    })

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
        if (!row) return;
            if (!message.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
            if (!message.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;

             if (row.modonlycommands === "enabled") {
                if (!message.member.hasPermission("KICK_MEMBERS")) return;
                const prefix = row.prefix
                if (row.prefix === undefined) return prefix = ">"
                if (message.content.indexOf(prefix) !== 0) return;
                const args = message.content.slice(prefix.length).trim().split(/ +/g);
                const command = args.shift().toLowerCase();
                    console.log(`[Orcinus] [${message.guild.name}] [${message.author.username}] ${row.prefix}${command} ${args}`);
                    try {
                        let commandFile = require(`../commands/${command}.js`);
                        commandFile.run(client, message, args);
                    } catch (err) {
                        if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                            return;
                    } else
                        console.log(err)
                    }
              } else {
            const prefix = row.prefix
            if (row.prefix === undefined) return prefix = ">"
            if (message.content.indexOf(prefix) !== 0) return;
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
                console.log(`[Orcinus] [${message.guild.name}] [${message.author.username}] ${row.prefix}${command} ${args}`);
                try {
                    let commandFile = require(`../commands/${command}.js`);
                    commandFile.run(client, message, args);
                } catch (err) {
                        if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                            return;
                    } else
                        console.log(err)
                    }
            } 
          })
        }
