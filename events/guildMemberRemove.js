const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
module.exports = (client, member, guild) => {
  if (member.user.bot) return;
        sql.get(`SELECT * FROM scores WHERE guildId ="${member.guild.id}"`).then(row => {
            if (row.dmmessage === "enabled") {
              try {
                if (row.wlsystem === "disabled") return;
                let WelcomeMess = row.leavemessage;
                var WelcomeFix = WelcomeMess.replace("%MENTION%", "<@" + member.user.id + ">").replace("%GUILDNAME%", member.guild.name).replace("%NAME%", member.user.username).replace("%MEMBERCOUNT%", member.guild.memberCount)
                member.user.send(WelcomeFix)
              } catch (err) {
                    console.log(err)
              }
            } else {
              try {
                if (row.wlsystem === "disabled") return;
                const welcomeChannel = member.guild.channels.find('name', row.wlchannel);
                if (!welcomeChannel === null) return;
                let WelcomeMess = row.leavemessage;
                var WelcomeFix = WelcomeMess.replace("%MENTION%", "<@" + member.user.id + ">").replace("%GUILDNAME%", member.guild.name).replace("%NAME%", member.user.username).replace("%MEMBERCOUNT%", member.guild.memberCount)
                client.channels.get(welcomeChannel.id).send(WelcomeFix)
              } catch (err) {
                console.log(err)
              }
        }
    })
}