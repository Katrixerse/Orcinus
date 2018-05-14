const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    const numbertopick = parseInt(args[0])
    const newnote = args.slice(1).join(" ")
    if (newnote >= 100) return message.channel.send("Notes cant be over 100 characters long.")
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
        const prefixtouse = row.prefix
        const usage = new Discord.RichEmbed()
                  .setColor(0x00A2E8)
                  .setThumbnail(client.user.avatarURL)
                  .setTitle("Command: " + prefixtouse + "notes")
                  .addField("Usage", prefixtouse + "notes <number> <text>")
                  .addField("Example", "[1] - Add a new note\n[2] - Clear notes\n[3] - View notes")
                  .setDescription("Description: " + "Add/remove or view your notes.");

    if (numbertopick === 1) {
        if (newnote < 1) return message.channel.send(usage)
        sql.get(`SELECT * FROM usernotes WHERE userId ="${message.author.id}"`).then(row2 => {
            if (row2.usernote >= 600) return message.channel.send("Notes cant go over 600 characters in total please use >notes 3.")
            if (!row2) return sql.run("INSERT INTO usernotes (userId, usernote) VALUES (?, ?)", [message.author.id, `${newnote}.`]);
          }).catch(() => {
            console.error;
            sql.run("CREATE TABLE IF NOT EXISTS usernotes (userId TEXT, usernote TEXT)").then(() => {
              sql.run("INSERT INTO usernotes (userId, usernote) VALUES (?, ?)", [message.author.id, `${newnote}.`]);
            });
          });
          message.channel.send("Note has been added to view current notes use >notes 3.")
          sql.get(`SELECT * FROM usernotes WHERE userId ="${message.author.id}"`).then(row2 => {
            sql.run(`UPDATE usernotes SET usernote = "${row2.usernote}\n${newnote}." WHERE userId = ${message.author.id}`);
          })
    } else if (numbertopick === 2) {
        sql.get(`SELECT * FROM usernotes WHERE userId ="${message.author.id}"`).then(row3 => {
            if (!row3) return message.channel.send("Notes have been removed.")
            sql.run(`DELETE FROM usernotes WHERE userId ="${message.author.id}"`)
            message.channel.send("Notes have been removed.")
        })
    } else if (numbertopick === 3) {
        sql.get(`SELECT * FROM usernotes WHERE userId ="${message.author.id}"`).then(row4 => {
            if (!row4) return message.channel.send("Notes have been removed.")
            message.channel.send("User notes: \n ```" + row4.usernote + "```")
        })
    } else {
        message.channel.send(usage)
    }
})
}
