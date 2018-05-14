const Discord = require("discord.js");
const bot = new Discord.Client();
const { exec } = require('child_process');
exports.run = async (client, message, args) => {
        if(message.author.id !== "130515926117253122") return message.channel.send("Only bot owner can use this command")

        const code = args.join(' ');
		if (!code) return message.channel.send('You provided no input are you stupid?');
		exec(code, (error, stdout, stderr) => {
			const input = `\`\`\`Bash\n${code}\n\`\`\``;
			if (error) {
				let output = `\`\`\`Bash\n${error}\n\`\`\``;
				const embed = new Discord.RichEmbed()
					.setTitle('Execute')
					.addField(':inbox_tray: Input', input)
					.addField(':x: Error', output)
					.setColor(0x00A2E8)
				return message.channel.send(embed);
			} else {
				const output = stderr || stdout;
				const output2 = `\`\`\`Bash\n${output}\n\`\`\``;
				const embed = new Discord.RichEmbed()
					.setTitle('Execute')
					.addField(':inbox_tray: Input', input)
					.addField(':outbox_tray: Output', output2)
					.setColor(0x00A2E8)
				return message.channel.send(embed);
			}
		});
}