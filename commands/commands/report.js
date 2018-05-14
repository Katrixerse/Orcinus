const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {

var cooldownUsers = [];

const checkCooldown = ((userId) => {
    if (cooldownUsers.indexOf(userId) > -1) {
        return true;
    } else {
        return false;
    }
});

const removeCooldown = ((userId, timeInSeconds) => {
    let index = cooldownUsers.indexOf(userId);
    if (index > -1) {
        setTimeout(() => {
            cooldownUsers = cooldownUsers.splice(index, 0);
        }, timeInSeconds * 1000)
    }
});

if (checkCooldown(message.author.id)) {
    message.channel.send("Sorry! Please wait another 10 secpmds to report again.");
    return;
}
cooldownUsers.push(message.author.id);
removeCooldown(message.author.id, 10000);
    let member = message.mentions.members.first();
    if (message.author.id == member.id) return message.channel.send("Can't report yourself. :x:")
    let reason = args.slice(1).join(" ") || `Moderator didn't give a reason.`;
    if (message.mentions.users.size < 1) return message.channel.send("Didnt mention a user to report.")
    let modlog = message.guild.channels.find('name', "reports");
    const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setTitle("Action: Report")
        .addField("Reported By:", message.author.tag + " (ID: " + message.author.id + ")")
        .addField("Reported User:", member.user.username + " (ID: " + member.id + ")")
        .addField("Reason", reason, true)
        .setFooter("Time reported: " + message.createdAt.toDateString())
        if (!modlog) return;
  message.channel.send("User has been reported, will be checked soon.")
  client.channels.get(modlog.id).send({embed});
}
