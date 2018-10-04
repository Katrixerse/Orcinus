const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
module.exports = (client, guild, message) => {
    sql.get(`SELECT * FROM scores WHERE guildId ="${guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO scores (guildId, prefix, casenumber, autoroleenabled, roletogive, logsenabled, logschannel, automoderation, wlchannel, wlsystem, welcomemessage, leavemessage, dmmessage, slowmode, slowmodetime, invitelinkprotection, websitelinkprotection, dupcharactersprotection, antijoin, modonlycommands, botlock, botlockchannel, levelsystem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [guild.id, ">", 1, "enabled", "none", "enabled", "logs", "disabled", "welcome", "disabled", "Hello %MENTION%, welcome to %GUILDNAME%.", "%NAME% has left the guild", "disabled", "disabled", 3, "disabled", "disabled", "disabled", "disabled", "disabled", "disabled", "bot-commands", "disabled"]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS scores (guildId TEXT, prefix TEXT, casenumber INTEGER, autoroleenabled TEXT, roletogive TEXT, logsenabled TEXT, logschannel TEXT, automoderation TEXT, wlchannel TEXT, wlsystem TEXT, welcomemessage TEXT, leavemessage TEXT, dmmessage TEXT, slowmode TEXT, slowmodetime INTEGER, invitelinkprotection TEXT, websitelinkprotection TEXT, dupcharactersprotection TEXT, antijoin TEXT, modonlycommands TEXT, botlock TEXT, botlockchannel TEXT, levelsystem TEXT)").then(() => {
          sql.run("INSERT INTO scores (guildId, prefix, casenumber, autoroleenabled, roletogive, logsenabled, logschannel, automoderation, wlchannel, wlsystem, welcomemessage, leavemessage, dmmessage, slowmode, slowmodetime, invitelinkprotection, websitelinkprotection, dupcharactersprotection, antijoin, modonlycommands, botlock, botlockchannel, levelsystem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [guild.id, ">", 1, "enabled", "none", "enabled", "logs", "disabled", "welcome", "disabled", "Hello %MENTION%, welcome to %GUILDNAME%.", "%NAME% has left the guild", "disabled", "disabled", 3, "disabled", "disabled", "disabled", "disabled", "disabled", "disabled", "bot-commands", "disabled"]);
      })
    })
};
