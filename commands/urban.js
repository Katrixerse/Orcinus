const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
      const urban = require('urban')
         try {
          var search = urban(args.join(' '));
        } catch (err) {
          return message.channel.send("**There were no results for this search term**");
        }
        if (!search || !search.first || typeof search.first !== "function") return;
        search.first(function (json) {
          if (json) {
            if (!json.definition || !json.example) return;
            if (json.definition.length > 1000) json.definition = json.definition.substr(0, 1000);
            if (json.example.length > 1000) json.example = json.example.substr(0, 1000);
           const embed = new Discord.RichEmbed()
           .setColor(0x00A2E8)
           .addField('Definition:', json.definition)
           .addField('Example:', json.example)
           const filtercheck = ["xxx", "porn", "fuck", "sex", "18+", "anal", "gay", "lesbian", "dick", "cock", "boobs", "ass", "nsfw", "tits", "nudes", "hentai", "nodes", "vagina", "pussy", "penis"]
           if (filtercheck.some(word2 => json.definition.toLowerCase().includes(word2))) return message.channel.send("Not allowed to get definitions for nsfw content.");
           const filtercheck2 = ["xxx", "porn", "fuck", "sex", "18+", "anal", "gay", "lesbian", "dick", "cock", "boobs", "ass", "nsfw", "tits", "nudes", "hentai", "nodes", "vagina", "pussy", "penis"]
           if (filtercheck2.some(word2 => json.example.toLowerCase().includes(word2))) return message.channel.send("Not allowed to get definitions for nsfw content.");
           message.channel.send({embed})
          } else {
           message.channel.send("**There were no results for this search term**")
          }
        });
}
   
