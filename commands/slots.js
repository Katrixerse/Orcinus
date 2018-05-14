const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
    const slots = [':grapes:', ':cherries:', ':lemon:'];
    const slotOne = slots[Math.floor(Math.random() * slots.length)];
    const slotTwo = slots[Math.floor(Math.random() * slots.length)];
    const slotThree = slots[Math.floor(Math.random() * slots.length)];
    const slotfour = slots[Math.floor(Math.random() * slots.length)];
    const slotfive = slots[Math.floor(Math.random() * slots.length)];
    const slotsix = slots[Math.floor(Math.random() * slots.length)];
    const slotseven = slots[Math.floor(Math.random() * slots.length)];
    const sloteight = slots[Math.floor(Math.random() * slots.length)];
    const slotnine = slots[Math.floor(Math.random() * slots.length)];
    if (slotOne === slotTwo && slotOne === slotThree || slotfour === slotfive && slotfour === slotsix || slotseven === sloteight && slotseven === slotnine) {
        const won = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .addField("Line 1", `${slotfour}|${slotfive}|${slotsix}`)
            .addField("Line 2", `${slotOne}|${slotTwo}|${slotThree}`)
            .addField("Line 3", `${slotseven}|${sloteight}|${slotnine}`)
            .setFooter("Wow! " + message.author.username + " won great job!");
        message.channel.send(won)
    } else {
        const lost = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .addField("Line 1", `${slotfour}|${slotfive}|${slotsix}`)
            .addField("Line 2", `${slotOne}|${slotTwo}|${slotThree}`)
            .addField("Line 3", `${slotseven}|${sloteight}|${slotnine}`)
            .setFooter("Awww " + message.author.username + " lost that sucks!");
        message.channel.send(lost)
    }
}
