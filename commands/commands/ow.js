const Discord = require("discord.js");
const client = new Discord.Client();
const snekfetch = require('snekfetch');
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = async (client, message, args) => {
try {
    let username = args[0].replace('#', '-')
    let platform = args[1]
    let region = args[2]
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
        if (!row) return;
        const prefixtouse = row.prefix
        const usage = new Discord.RichEmbed()
                  .setColor(0x00A2E8)
                  .setThumbnail(client.user.avatarURL)
                  .setTitle("Command: " + prefixtouse + "ow")
                  .addField("Usage", prefixtouse + "ow <username> <pc/ps4/xbox> <region ex: us/asia/eu>")
                  .addField("Example", prefixtouse + "ow dafran#21192 pc us.")
                  .setDescription("Description: " + "Gets a players overwatch stats");
    if (username < 1) return message.channel.send(usage)
    if (platform < 1) return message.channel.send(usage)
    if (region < 1) return message.channel.send(usage)
    const { body } = await snekfetch
            .get(`https://ow-api.com/v1/stats/${platform}/${region}/${username}/complete`)
                message.channel.send({
                    embed: {
                      author: {
                        name: body.data.name,
                        icon_url: 'https://pbs.twimg.com/profile_images/538246909664559104/oeOj9DtM.png',
                        url: `http://masteroverwatch.com/profile/${platform}/${region}/${username}`
                      },
                      title: 'Overwatch Information:',
                      color: 16765404,
                      fields: [
                        {
                          name: 'Level',
                          value: body.data.level != null ? body.data.level : '0',
                          inline: true
                        },
                        {
                          name: 'Quick Wins',
                          value: body.data.quickPlayStats.games.won != null ? body.data.quickPlayStats.games.won : '0',
                          inline: true
                        },
                        {
                          name: 'Competitive Wins',
                          value: body.data.competitiveStats.games.won != null ? body.data.competitiveStats.games.won : '0',
                          inline: true
                        },
                        {
                          name: 'Competitive Lost',
                          value: body.data.competitiveStats.games.played != null ? body.data.competitiveStats.games.played - body.data.competitiveStats.games.won : '0',
                          inline: true
                        },
                        {
                          name: 'Playtime (Quick)',
                          value: body.data.quickPlayStats.careerStats.allHeroes.game.timePlayed != null ? body.data.quickPlayStats.careerStats.allHeroes.game.timePlayed : '0',
                          inline: true
                        },
                        {
                          name: 'Playtime (Competitive)',
                          value: body.data.competitiveStats.careerStats.allHeroes.game.timePlayed != null ? body.data.competitiveStats.careerStats.allHeroes.game.timePlayed : '0',
                          inline: true
                        }
                      ],
                      thumbnail: {
                        url:
                          body.data.icon != null ? body.data.icon : ''
                      },
                      timestamp: new Date(),
                      footer: {
                        icon_url: client.user.avatarURL,
                        text: client.user.username
                      }
                    }
                  })
                })
    } catch (err) {
        console.log(err)
    }
}
