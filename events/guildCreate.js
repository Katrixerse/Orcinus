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

    sql.get(`SELECT * FROM custom_commands WHERE guildId ="${guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO custom_commands (guildId, customcommandsenabled, customcommand1, customcommand2, customcommand3, customcommand4) VALUES (?, ?, ?, ?, ?, ?)", [guild.id, "disabled", "not set", "not set", "not set", "not set"]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS custom_commands (guildId TEXT, customcommandsenabled TEXT, customcommand1 TEXT, customcommand2 TEXT, customcommand3 TEXT, customcommand4 TEXT)").then(() => {
          sql.run("INSERT INTO custom_commands (guildId, customcommandsenabled, customcommand1, customcommand2, customcommand3, customcommand4) VALUES (?, ?, ?, ?, ?, ?)", [guild.id, "disabled", "not set", "not set", "not set", "not set"]);
      })
    })

    /*sql.get(`SELECT * FROM autorole WHERE guildId ="${guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO autorole (guildId, autoroleenabled, roletogive) VALUES (?, ?, ?)", [guild.id, "disabled", "none"]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS autorole (guildId TEXT, autoroleenabled TEXT, roletogive TEXT)").then(() => {
          sql.run("INSERT INTO autorole (guildId, autoroleenabled, roletogive) VALUES (?, ?, ?)", [guild.id, "disabled", "none"]);
      })
    })

    sql.get(`SELECT * FROM misc WHERE guildId ="${guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO misc (guildId, prefix, casenumber, levelsystem, gamblesystem, antijoin, modonlycommands) VALUES (?, ?, ?, ?, ?, ?, ?)", [guild.id, ">", 1, "disabled", "disabled", "disabled", "disabled"]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS misc (guildId TEXT, prefix TEXT, casenumber TEXT, levelsystem TEXT, gamblesystem TEXT, antijoin TEXT, modonlycommands TEXT)").then(() => {
          sql.run("INSERT INTO misc (guildId, prefix, casenumber, levelsystem, gamblesystemm, antijoin, modonlycommands) VALUES (?, ?, ?, ?, ?, ?, ?)", [guild.id, ">", 1, "disabled", "disabled", "disabled", "disabled"]);
      })
    })

    sql.get(`SELECT * FROM misc2 WHERE guildId ="${guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO misc2 (guildId, botlock, mutedrole, warningsforbanenabled, warningsforkickenabled, warningsforkick, warningsforban) VALUES (?, ?, ?, ?, ?, ?, ?)", [guild.id, "disabled", "Muted", "disabled", "disabled", 7, 10]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS misc2 (guildId TEXT, botlock TEXT, mutedrole TEXT, warningsforbanenabled TEXT, warningsforkickenabled TEXT, warningsforkick INTEGER, warningsforban INTEGER)").then(() => {
          sql.run("INSERT INTO misc2 (guildId, botlock, mutedrole, warningsforbanenabled, warningsforkickenabled, warningsforkick, warningsforban) VALUES (?, ?, ?, ?, ?, ?, ?)", [guild.id, "disabled", "Muted", "disabled", "disabled", 7, 10]);
      })
    })

    sql.get(`SELECT * FROM guild_messages WHERE guildId ="${guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO guild_messages (guildId, wlchannel, wlsystem, welcomemessage, leavemessage, dmmessage) VALUES (?, ?, ?, ?, ?, ?)", [guild.id, ">", 1, "welcome", "disabled", "Hello %MENTION%, welcome to %GUILDNAME%.", "%NAME% has left the guild.", "disabled"]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS guild_messages (guildId TEXT, wlchannel TEXT, wlsystem TEXT, welcomemessage TEXT, leavemessage TEXT, dmmessage TEXT)").then(() => {
          sql.run("INSERT INTO guild_messages (guildId, wlchannel, wlsystem, welcomemessage, leavemessage, dmmessage) VALUES (?, ?, ?, ?, ?, ?)", [guild.id, ">", 1, "welcome", "disabled", "Hello %MENTION%, welcome to %GUILDNAME%.", "%NAME% has left the guild.", "disabled"]);
      })
    })

    sql.get(`SELECT * FROM auto_moderation WHERE guildId ="${guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO automoderation (guildId, automoderation, invitelinkprotection, websitelinkprotection, dupcharactersprotection) VALUES (?, ?, ?, ?, ?)", [guild.id, "disabled", "disabled", "disabled", "disabled"]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS automoderation (guildId TEXT, automoderation TEXT, invitelinkprotection TEXT, websitelinkprotection TEXT, dupcharactersprotection TEXT)").then(() => {
          sql.run("INSERT INTO automoderation (guildId, automoderation, invitelinkprotection, websitelinkprotection, dupcharactersprotection) VALUES (?, ?, ?, ?, ?)", [guild.id, "disabled", "disabled", "disabled", "disabled"]);
      })
    })

    sql.get(`SELECT * FROM slow_mode_system WHERE guildId ="${guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO slowmodesystem (guildId, slowmode, slowmodetime) VALUES (?, ?, ?)", [guild.id, "disabled", 3]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS slowmodesystem (guildId TEXT, slowmode TEXT, slowmodetime INTEGER)").then(() => {
          sql.run("INSERT INTO slowmodesystem (guildId, slowmode, slowmodetime) VALUES (?, ?, ?)", [guild.id, "disabled", 3]);
      })
    })

    sql.get(`SELECT * FROM log_options WHERE guildId ="${guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO logoptions (guildId, logsenabled, logschannel) VALUES (?, ?, ?)", [guild.id, "disabled", "mod-log"]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS logoptions (guildId TEXT, logsenabled TEXT, logschannel TEXT)").then(() => {
          sql.run("INSERT INTO logoptions (guildId, logsenabled, logschannel) VALUES (?, ?, ?)", [guild.id, "disabled", "mod-log"]);
      })
    })

    sql.get(`SELECT * FROM custom_commands WHERE guildId ="${guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO custom_commands (guildId, customcommandsenabled, customcommand1, customcommand2, customcommand3, customcommand4) VALUES (?, ?, ?, ?, ?, ?)", [guild.id, "disabled", "not set", "not set", "not set", "not set"]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS custom_commands (guildId TEXT, logsenabled TEXT, logschannel TEXT)").then(() => {
          sql.run("INSERT INTO custom_commands (guildId, logsenabled, logschannel) VALUES (?, ?, ?)", [guild.id, "disabled", "not set", "not set", "not set", "not set"]);
      })
    }) */

};