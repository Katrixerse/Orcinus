const Discord = require("discord.js");
const bot = new Discord.Client();
const { addGuildtoDB } = require('../assets/handlers/addDbEntry');
module.exports = (client, guild, message) => {
    addGuildtoDB();
};
