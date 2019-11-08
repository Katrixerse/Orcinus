const Discord = require("discord.js");
const client = new Discord.Client({
  disabledEvents: ["RELATIONSHIP_ADD", "RELATIONSHIP_REMOVE", "TYPING_START"],
  disableEveryone: true,
  messageCacheMaxSize: 150,
  messageCacheLifetime: 240,
  messageSweepInterval: 300,
});
const fs = require("fs");
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
const invitecheck = ["discord.gg", "discord.me", "discord.io/", "discordapp.com/invite"]
const weblinkcheck = ["http", "www.", ".com", ".net", ".org", ".ca", ".co.uk"]

const config = require("./assets/jsons/config.json");

client.on('warn', err => console.warn('[WARNING]', err));

client.on('error', err => console.error('[ERROR]', err));

client.on('uncaughtException', (err) => {
    console.log("Uncaught Exception: " + err)
    process.exit(1)
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('[FATAL] Possibly Unhandled Rejection at: Promise ', promise, ' reason: ', reason.message);
});

client.on('disconnect', () => {
  console.warn('Disconnected!')
  process.exit(0);
})

client.on('reconnecting', () => console.warn('Reconnecting...'))

const talkedRecently = new Set();

const talkedRecently2 = new Set();


var cooldownUsers = [];

const checkCooldown = ((userId) => {
  if(cooldownUsers.indexOf(userId) > -1) {
    return true;
  } else {
    return false;
  }
});

const removeCooldown = ((userId, timeInSeconds) => {
  let index = cooldownUsers.indexOf(userId);
  if(index > -1) { 
    setTimeout(() => {
      cooldownUsers = cooldownUsers.splice(index, 0);
    }, timeInSeconds * 1000)
  }
});

fs.readdir('./events/', (err, files) => {
  files = files.filter(f => f.endsWith('.js'));
  files.forEach(f => {
      const event = require(`./events/${f}`);
      client.on(f.split('.')[0], event.bind(null, client));
      delete require.cache[require.resolve(`./events/${f}`)];
  });
});

client.on("guildCreate", async (guild) => {
  try {
  console.log(`Someone added Orcinus to their discord! ${guild.name} Member count: ${guild.memberCount} owned by: ${guild.owner.user.username}!`)
  const owner = guild.owner.user
  var guildMsg = [
      "Thanks for adding me to your server. Just a few tips to get you started..",
      "```**1.** Orcinus default prefix is `>`.",
      "**2.** Commands will not work in direct messages.",
      "**3.** Set welcome leave messages with >welcomeleave.",
      "**4.** Set logs channel with >logs [channel name].",
      "**5.** Set autorole with >autorole [role name].",
      "**6.** Prefix can be changed with >prefix [new prefix].",
      "**7.** Profile System can be enabled with >profilesystem.",
      "**8.** Automod can be enabled with >automod enable all```"
  ]
  owner.send(guildMsg)
} catch (err) {
  return;
}
});

client.on('guildDelete', (guild) => {
  console.log(`Someone removed Orcinus from their discord! ${guild.name} Member count: ${guild.memberCount} owned by: ${guild.owner.user.username}!`)
  sql.run(`DELETE FROM scores WHERE guildId = ${guild.id}`)
});

client.on("guildMemberAdd", (member) => {
  if (!member.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
    if (!member.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;
    if (!member.guild.member(client.user).hasPermission('READ_MESSAGE_HISTORY')) return;
  sql.get(`SELECT * FROM scores WHERE guildId ="${member.guild.id}"`).then(row => {
    if (row.antijoin === "enabled") {
      member.user.send("Anti-join has been enabled in " + member.guild.name + " you have been kicked automatically.")
      member.guild.member(member.user.id).kick().catch(console.error);
    } else {
      if (!member.guild.member(client.user).hasPermission('MANAGE_ROLES')) return;
        let autoRole = client.guilds.get(member.guild.id).roles.find(r => r.name == row.roletogive);
        if (!autoRole) return
        member.guild.member(member.user.id).addRole(autoRole).catch(console.error);
    }
    })
});

client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.emoji.name === '⭐') {
    let message = reaction.message
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;

    if (!message.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;
    if (!message.guild.member(client.user).hasPermission('READ_MESSAGE_HISTORY')) return;
    if (message <= 1) return;
    if (message.guild.id === "110373943822540800") return;
    if (message.guild.id === "264445053596991498") return;
    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor(0x00A2E8)
      .setTitle(`⭐ ${client.user.username} Starboard ⭐`)
      .addField('Starred By', `${user.username}`, true)
      .addField('Channel', `${message.channel}`, true)
      .addField('Message', `${message.content}`, false)
      .setTimestamp()
    let modlog = message.guild.channels.find(channel => channel.name == 'starboard');
    if (!modlog) return
    if (user.id === message.author.id) return message.channel.send(`${message.author}, You can't star your own messages!`)

    reacts = message.reactions.filter(function (reacts) {
      return reacts.emoji.name === '⭐'
    })
    if (reacts.length > 1) return;
    client.channels.get(modlog.id).send({embed}).catch(console.error);
  }
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if (!message.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
  if (!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
  if (!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if (!message.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;
  if (!message.guild.member(client.user).hasPermission('READ_MESSAGE_HISTORY')) return;

  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
    if (!row) return;

    const prefix = row.prefix
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

  if (message.content.startsWith("<@" + client.user.id +">") || message.content.startsWith("<@!" + client.user.id +">")) {
    message.reply("current guild prefix is `" + row.prefix + "`.")
  }

  if (invitecheck.some(word => message.content.toLowerCase().includes(word))) {
  if (message.content.includes(row.prefix)) return
  if (row.automoderation === "disabled") return;
  if (row.invitelinkprotection === "disabled") return;
  if (message.member.hasPermission("KICK_MEMBERS")) return;
  message.delete()
  let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
  const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setTitle("Action: Auto Moderation")
    .addField("Moderator", client.user.username + " (ID: " + client.user.id + ")")
    .addField("User", message.author.username + " (ID: " + message.author.id + ")")
    .addField("In channel", message.channel.name, true)
    .addField("Reason", "Invite Link", true)
    .addField("Invite link", message.cleanContent)
    .setFooter("Time used: " + message.createdAt.toDateString())
    if (!modlog) return;
    if (row.logsenabled === "disabled") return;
    client.channels.get(modlog.id).send({embed});
    message.reply(" not allowed to post invite links.").then((response) => {
      response.delete(6000);
      });
}

  if (weblinkcheck.some(word2 => message.content.toLowerCase().includes(word2))) {
  if (message.content.includes(row.prefix)) return
  if (row.automoderation === "disabled") return;
  if (row.websitelinkprotection === "disabled") return;
  if (message.member.hasPermission("KICK_MEMBERS")) return;
  message.delete()
  let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
  const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setTitle("Action: Auto Moderation")
    .addField("Moderator", client.user.username + " (ID: " + client.user.id + ")")
    .addField("User", message.author.username + " (ID: " + message.author.id + ")")
    .addField("In channel", message.channel.name, true)
    .addField("Reason", "Website Link", true)
    .addField("Website link", message.cleanContent)
    .setFooter("Time used: " + message.createdAt.toDateString())
    if (!modlog) return;
    if (row.logsenabled === "disabled") return;
    client.channels.get(modlog.id).send({embed});
    message.reply(" not allowed to post website links.").then((response) => {
      response.delete(6000);
      });
  }

   if (message.content.includes('')) {
    if (message.content.includes(row.prefix)) return
    if (row.automoderation === "disabled") return;
    if (row.dupcharactersprotection === "disabled") return;
      if (message.member.hasPermission("KICK_MEMBERS")) return;
      const check1 = args.join(" ")
      if (check1.includes('.')) return;
      var hasDuplicates = /([a-zA-Z])\1+$/;
      const result = hasDuplicates.test(check1)
      if (result === true) { 
        message.delete()
        let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
        const embed = new Discord.RichEmbed()
          .setColor(0x00A2E8)
          .setTitle("Action: Auto Moderation")
          .addField("Moderator", client.user.username + " (ID: " + client.user.id + ")")
          .addField("User", message.author.username + " (ID: " + message.author.id + ")")
          .addField("In channel", message.channel.name, true)
          .addField("Reason", "Duplicated Characters", true)
          .addField("Message Content", message.cleanContent)
          .setFooter("Time used: " + message.createdAt.toDateString())
          if (!modlog) return;
          if (row.logsenabled === "disabled") return;
          client.channels.get(modlog.id).send({embed});
          let user = message.guild.member(message.mentions.users.first())
        message.reply(" message contains duplicated characters.").then((response) => {
          response.delete(6000);
          });
    } 
  }

  if (message.content.includes('')) {
      if (message.member.hasPermission("KICK_MEMBERS")) return;
      if (row.slowmode === "disabled") return;
      if (row.slowmode === "enabled") {
        if(checkCooldown(message.author.id)) {
          message.delete();
         }
      cooldownUsers.push(message.author.id);
      removeCooldown(message.author.id, row.slowmodetime);
      } 
     } 
    })

    if (message.content.startsWith("")) {
      sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row2 => {
        if (!row2) return;
        if (row2.levelsystem === "disabled") return;
        sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
          if (!row) return;
          if (row.level === 25) {
            if (row.awards.includes("None")) return sql.run(`UPDATE profiles SET awards = "" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
            if (row.awards.includes(":tada:")) return;
             sql.run(`UPDATE profiles SET awards = "${row.rewards + ":tada:"}" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
          } else if (row.level === 50) {
            if (row.awards.includes("None")) return sql.run(`UPDATE profiles SET awards = "" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
            if (row.awards.includes(":medal:")) return;
          sql.run(`UPDATE profiles SET awards = "${row.awards + " :medal:"}" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
          } else if (row.level === 100) {
            if (row.awards.includes("None")) return sql.run(`UPDATE profiles SET awards = "" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
            if (row.awards.includes(":trophy:")) return;
            sql.run(`UPDATE profiles SET awards = "${row.awards + " :trophy:"}" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
          } else if (row.cash >= 10000) {
            if (row.awards.includes("None")) return sql.run(`UPDATE profiles SET awards = "" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
            if (row.awards.includes(":moneybag:")) return;
            sql.run(`UPDATE profiles SET awards = "${row.awards + " :moneybag:"}" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
          } else if (row.cash >= 100000) {
            if (row.awards.includes("None")) return sql.run(`UPDATE profiles SET awards = "" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
            if (row.awards.includes(":credit_card:")) return;
            sql.run(`UPDATE profiles SET awards = "${row.awards + " :credit_card:"}" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
          } else {
            return;
          }
       });
    });
    }

  if (message.content.startsWith("")) {
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row2 => {
      if (!row2) return;
      if (row2.levelsystem === "disabled") return;
    if (talkedRecently.has(message.author.id)) return;
    const xpgained = Math.floor(Math.random() * 15) + 1;
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
      if (!row) {
          sql.run("INSERT INTO profiles (guildId, userId, xp, level, bank, cash, awards, rep, username, winningchance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [message.guild.id, message.author.id, 0, 1, 0, 100, "None", 0, message.author.username, 0]);
        } else {
          let curLevel = Math.floor(0.1 * Math.sqrt(row.xp + 1));
          if (curLevel > row.level) {
            row.level = curLevel;
            if (row.level >= 300) return;
            sql.run(`UPDATE profiles SET xp = ${row.xp + xpgained}, level = ${row.level} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
          }
          if (row.xp >= 9999999) return;
          sql.run(`UPDATE profiles SET xp = ${row.xp + xpgained}, cash = ${row.cash + 10}, username = "${message.author.username}" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
        }
      }).catch(() => {
      console.error;
      sql.run("CREATE TABLE IF NOT EXISTS profiles (guildId TEXT, userId TEXT, xp INTEGER, level INTEGER, bank INTEGER, cash INTEGER, awards TEXT, rep INTEGER, username TEXT, winningchance INTEGER)").then(() => {
        sql.run("INSERT INTO profiles (guildId, userId, xp, level, bank, cash, awards, rep, username, winningchance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [message.guild.id, message.author.id, 0, 1, 0, 100, "None", 0, message.author.username, 0]);
      })
    })
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 60000);
  })
}

});

client.login(config.token);
