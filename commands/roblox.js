const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch')
exports.run = (client, message, args) => {
        let saybot = args.join('_');
        const url = `https://api.roblox.com/users/get-by-username?username=${saybot}`;
        snekfetch.get(url).then(result => {
              const data = result.body.Id;
              if (saybot.length < 1) return message.channel.send("Need to provide a username to use this command")
              if (result.body.Id === "undefined") return message.channel.send("Couldn't find a roblox user by the name of " + saybot)
              const url2 = `https://api.roblox.com/ownership/hasasset?userId=${data}&assetId=102611803`;
              snekfetch.get(url2).then(a => {
                const Verifiedcheck = a.body
                  const embed = new Discord.RichEmbed()
                  .setColor(0x00A2E8)
                  .setTitle("Username: " + saybot)
                  .setDescription("User ID: " + data)
                  .addField("Verified", Verifiedcheck)
                  .setFooter("Profile Link: " + `https://web.roblox.com/users/${data}/profile`)
                  .setThumbnail("https://roblox.com/Thumbs/BCOverlay.ashx?username=" + saybot)
                  .setImage("http://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&Format=Png&username=" + saybot);
                  message.channel.send({embed}).catch(console.error);
                })
            }) 
  };