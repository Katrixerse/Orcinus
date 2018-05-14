const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setTitle("Guild settings")
        .addField("General", `Prefix: ${row.prefix}`)
        .addField("Messages", `Welcome message: ${row.welcomemessage} \nLeave message: ${row.leavemessage}`)
        .addField("Channels", `Welcome/leave channel: ${row.wlchannel} \nLogs channel: ${row.logschannel}`)
        .addField("Moderation", `Anti invite: ${row.invitelinkprotection} \nAnti website link: ${row.websitelinkprotection} \nAnti dup characters: ${row.dupcharactersprotection} \nSlowmode: ${row.slowmode} \nMod only commands: ${row.modonlycommands}`)
        .addField("Misc", `Anti join: ${row.antijoin} \nAutorole: ${row.autoroleenabled}\nProfile/Level/Cash system: ${row.levelsystem}`);
      message.channel.send(embed)
    })
}