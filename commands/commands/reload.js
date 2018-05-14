const Discord = require("discord.js")
const fs = require("fs");
const superagent = require(`superagent`);
exports.run = (client, message, args) => {
      if (message.author.id !== "130515926117253122") return message.channel.send("Only owners can use this command");
      try {
       client.user.setPresence({ game: { name: ">help - In " + (Math.ceil(client.guilds.size)) + ` servers`, type: 0 } });
    fs.readdir("./commands/", (err, files) => {
        const filez = files.length
        if (err) return console.error(err);
        message.channel.send(`Refreshed \`${filez + 11}\` commands successfully!`)
        console.log(`Refreshed ${filez + 11} commands`)
        files.forEach(file => {
             delete require.cache[require.resolve(`./${file}`)];
        });
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
};