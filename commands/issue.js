const Discord = require("discord.js");
const bot = new Discord.Client();
const talkedRecently = new Set();
exports.run = (client, message, args) => {
                        if (talkedRecently.has(message.author.id)) return message.channel.send("You already reported a issue recently please wait another 30mins.");
                        let feedback = args.join(' ');
                            if (feedback.length < 10) return message.reply('Feedback is to short minimum of 10 characters.').catch(console.error);
                        client.users.get("130515926117253122").send("Mr. Robot, a user has reported a issue on the bot: " + feedback + " | Sent in by: " + message.author.username);
                            message.reply("thanks for reporting a issue/choosing to give feedback it has been sent!")
                    talkedRecently.add(message.author.id);
                    setTimeout(() => {
                        talkedRecently.delete(message.author.id);
                    }, 30 * 60000);
}
