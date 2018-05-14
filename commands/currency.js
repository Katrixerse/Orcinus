const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
      const base = args[0];
      const to = args[1];
      const amount = args[2]
        if (base === to) return message.channel.send(`Converting ${base} to ${to} is the same value, dummy.`);
        const { body } = await snekfetch
            .get('http://api.fixer.io/latest')
            .query({
                base,
                symbols: to
            });
            const tofixed = parseFloat(amount).toFixed(2)
            const tofixed2 = parseFloat(body.rates[to]).toFixed(2)
        message.channel.send(`$${tofixed} ${base} is $${tofixed * tofixed2} ${to}.`).catch(console.error);
    }
   
