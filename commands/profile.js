const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row2 => {
        if (!row2) return;
        if (row2.levelsystem === "disabled") return message.channel.send("Level system has been disabled for this guild.");
        if (message.mentions.users.size < 1) {
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                
                /*let curxp = row.xp;
                let curlvl = row.level;
                let nxtLVL = curlvl * 200;
                let dif = nxtLVL - curxp; */
                if (!row) {
                    message.channel.send("Need to start talking first!")
                }
                    const embed = new Discord.RichEmbed()
                        .setColor(0x00A2E8)
                        .setTitle(" Profile info For: " + message.author.username + " ")
                        .setThumbnail(message.author.avatarURL)
                        .addField("Your current level: ", row.level)
                        .addField("Total XP: ", row.xp + "XP")
                        .addField("Bank: ", "$" + row.bank)
                        .addField("Cash: ", "$" + row.cash)
                        .addField("Rep:", row.rep)
                        .addField("Awards: ", row.awards);
                    message.channel.send(embed)
            })
        } else if (message.content.includes("<@" + client.user.id +">") || message.content.includes("<@!" + client.user.id +">")) {
               /* let curxp = row.xp;
                let curlvl = row.level
                let nxtLVL = curlvl * 200;
                let dif = nxtLVL - curxp; */
                const embed = new Discord.RichEmbed()
                    .setColor(0x00A2E8)
                    .setTitle(" Profile info For: " + client.user.username + " ")
                    .setThumbnail(client.user.avatarURL)
                    .addField("Current level: ", "1000")
                    .addField("Total XP: ", "1395434567276XP")
                    .addField("Bank: ", "$" + "9324432")
                    .addField("Cash: ", "$" + "1657562386")
                    .addField("Rep:", "102")
                    .addField("Awards: ", ":tada: :medal: :military_medal: :trophy: :tools: :tophat: :spy::skin-tone-1: :moneybag: :first_place: :credit_card: :watch:");
                message.channel.send(embed)
        } else {
            let user = message.mentions.users.first();
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row => {
               /* let curxp = row.xp;
                let curlvl = row.level
                let nxtLVL = curlvl * 200;
                let dif = nxtLVL - curxp; */
                if (!row) return message.channel.send("User needs to start talking first.")
                const embed = new Discord.RichEmbed()
                    .setColor(0x00A2E8)
                    .setTitle(" Profile info For: " + user.username + " ")
                    .setThumbnail(user.avatarURL)
                    .addField("Current level: ", row.level)
                    .addField("Total XP: ", row.xp + "XP")
                    .addField("Bank: ", "$" + row.bank)
                    .addField("Cash: ", "$" + row.cash)
                    .addField("Rep:", row.rep)
                    .addField("Awards: ", row.awards);
                message.channel.send(embed)
            })
        }
    })
}