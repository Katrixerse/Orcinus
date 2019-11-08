const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const superagent = require("superagent")
const { createSQLDb } = require('../assets/handlers/createDb');
module.exports = async (client, guild, files) => {
    await createSQLDb();
    fs.readdir("./commands/", (err, files) => {
        const filez = files.length
        if (err) return console.error(err);
        console.log(`Loaded ${filez + 11} commands successfully!`)
    })
    console.log(`[READY] Logged in as ${client.user.tag}! (${client.user.id})`);
    client.setInterval(() => {
        var activities = [{
                "text": "with Mr. Robot",
                "type": "PLAYING"
            },
            {
                "text": "with your heart",
                "type": "PLAYING"
            },
            {
                "text": "Andrew",
                "type": "WATCHING"
            },
            {
                "text": "anime",
                "type": "WATCHING"
            },
            {
                "text": "Cities: Skylines",
                "type": "PLAYING"
            },
            {
                "text": "over " + (Math.ceil(client.guilds.size)) + " servers.",
                "type": "WATCHING"
            },
            {
                "text": ">help - In " + (Math.ceil(client.guilds.size)) + " servers.",
                "type": "PLAYING"
            },
            {
                "text": "Unreal Editor",
                "type": "PLAYING"
            },
            {
                "text": "Visual Studio Code",
                "type": "PLAYING"
            },
            {
                "text": "Terraria",
                "type": "PLAYING"
            },
            {
                "text": "NETFLIX",
                "type": "WATCHING"
            },
            {
                "text": "Rap God",
                "type": "LISTENING"
            },
            {
                "text": "House Of Cards",
                "type": "LISTENING"
            }
        ]
        try {
            const activity = activities[Math.floor(Math.random() * activities.length)];
            client.user.setActivity(activity.text, {
                type: activity.type
            });
            const servercount = (Math.ceil(client.guilds.size))
            superagent.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
                .set('Authorization', 'KEY')
                .send({
                    server_count: servercount,
                    shard_count: "1"
                })
                .then(console.log('Updated discordbots.org status.'))
                .catch(e => console.warn('dbots.org down spam @oliy'));
            superagent.post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
                .set('Authorization', 'KEY')
                .send({
                    server_count: servercount,
                    shard_count: "1"
                })
                .then(console.log('Updated bots.discord.pw status.'))
                .catch(e => console.warn('bots.discord.pw down spam @oliy'));
        } catch (err) {
            return;
        }
    }, 3600000);
}
