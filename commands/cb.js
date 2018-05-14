const Discord = require("discord.js");
const bot = new Discord.Client();
const Cleverbot = require('cleverio');
        const clevs = new Cleverbot.Client({
            key: "J3tNu0VNfJjjv9LmFNZxSqF2KtDY2gAl",
            user: "P34kgHyXaw5G2CSS",
            nick: "orcinus"
        });
exports.run = async (client, message, args) => {
    try {
        clevs.create();
        const text = args.join(" ")
        const { response } = await clevs.ask(text);
        message.channel.send(response);
    } catch (err) {
        console.log(err)
    }
}
   
