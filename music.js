const Discord = require("discord.js");
const yt = require('ytdl-core');
const snekfetch = require('snekfetch');
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
const client = new Discord.Client({disableEveryone: true, disabledEvents: "RELATIONSHIP_ADD", "RELATIONSHIP_REMOVE", "TYPING_START"});
let dispatcher;

if (Number(process.version.slice(1).split(".")[0]) < 8) {
	console.log("Node 8.0.0 or higher is required. Update Node on your system.");
}

let queue = {};

client.on('uncaughtException', (err) => {
	console.log("error", "Uncaught Exception", err);
});

process.on("unhandledRejection", (err) => {
	console.log("Uncaught Promise Error", err);
});

client.on('disconnect', () => console.warn('Disconnected!'))

client.on('reconnecting', () => console.warn('Reconnecting...'))

client.on('ready', () => {
	console.log('ready!');
});

client.on("message", async (message) => {
	if (message.author.bot) return;
	if (message.channel.type === 'dm') return;
	if (!message.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
	if (!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if (!message.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;
	if (!message.guild.member(client.user).hasPermission('READ_MESSAGE_HISTORY')) return;

	sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(async (row) => {
		if (!row) return;

		const prefix = row.prefix
		if (row.prefix === undefined) return prefix = ">"
		if (message.content.indexOf(prefix) !== 0) return;
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		if (command === "play") {
			if (!message.guild.member(client.user).hasPermission('CONNECT')) return message.reply('Sorry, i dont have the perms to do this cmd i need CONNECT. :x:')
			if (!message.guild.member(client.user).hasPermission('SPEAK')) return message.reply('Sorry, i dont have the perms to do this cmd i need SPEAK. :x:')
			const channel = message.member.voiceChannel;
			if (!channel || channel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
			if (queue[message.guild.id] === undefined) return message.channel.send(`Add some songs to the queue first with add`);
			if (!message.guild.voiceConnection) {
				channel.join()
			}
			if (queue[message.guild.id].playing) return message.channel.send('Already Playing the queue.');
			queue[message.guild.id].playing = true;
			(function play(song) {
				if (song === undefined) return message.channel.send('Queue is empty, disconnecting till more is queued.').then(() => {
					queue[message.guild.id].playing = false;
					message.member.voiceChannel.leave();
				});
				console.log(song.title + " in " + message.guild.name);
				message.channel.send(`Playing: **${song.title}** as requested by: **${song.requester}**`);
				dispatcher = message.guild.voiceConnection.playStream(yt(song.url, {
					audioonly: true
				}), {
					seek: 0,
					passes: 1, // Can be increased to reduce packetloss.
					bitrate: 'auto',
					quality: 'highestaudio'
				});
				dispatcher.on('end', () => {
					play(queue[message.guild.id].songs.shift());
				});
				dispatcher.on('error', (err) => {
					return message.channel.send('error: ' + err).then(() => {
						play(queue[message.guild.id].songs.shift());
					});
				});
			})(queue[message.guild.id].songs.shift());
		}

		if (command === "add") {
			let query = args.join(" ");
			if (query < 1) return message.channel.send('You must include a query for what you want to play, add [songname/url]')
			const msg = await message.channel.send("Searching...")
			if (query.includes("youtube.com/watch")) {
				let url = query
				yt.getInfo(url, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
					if (err) return message.channel.send('Invalid YouTube Link: ' + err);
					if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
					queue[message.guild.id].songs.push({
						url: url,
						title: info.title,
						requester: message.author.username
					});
					msg.edit(`Added **${info.title}** to the queue`);
				});
			} else {
			const { body } = await snekfetch
				.get('https://www.googleapis.com/youtube/v3/search')
				.query({
					part: 'snippet',
					type: 'video',
					maxResults: 1,
					q: query,
					safeSearch: 'strict',
					order: 'relevance',
					videoDuration: 'medium',
					key: "GOOGLEKEY"
				});
			if (!body.items.length) return message.channel.send('No results found for ' + query + ".");
			let url = `https://www.youtube.com/watch?v=${body.items[0].id.videoId}`
			yt.getInfo(url, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
				if (err) return message.channel.send('Invalid YouTube Link: ' + err);
				if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
				queue[message.guild.id].songs.push({
					url: url,
					title: info.title,
					requester: message.author.username
				});
				info
				msg.edit(`Added **${info.title}** to the queue`);
			});
		}
	}

		if (command === "join") {
			return new Promise((resolve, reject) => {
				const voiceChannel = message.member.voiceChannel;
				if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
				voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
			});
		}

		if (command === "leave") {
			return new Promise((resolve, reject) => {
				const voiceChannel = message.member.voiceChannel;
				if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t leave your voice channel...');
				voiceChannel.leave()
			});
		}

		if (command === "queue") {
			if (queue[message.guild.id] === undefined || queue[message.guild.id] === {}) return message.channel.send(`Add some songs to the queue first with add`);
			let tosend = [];
			queue[message.guild.id].songs.forEach((song, i) => {
				tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);
			});
			if (tosend.length <= 0) return message.channel.send(`**${message.guild.name}'s Music Queue:** Currently **${tosend.length}** queued.`);
			message.channel.send(`**${message.guild.name}'s Music Queue:** Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
		}

		if (command === "clearqueue") {
                   if (queue === {}) return message.channel.send('Queue is empty, have no songs to remove.');
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t leave your voice channel...');
			queue[message.guild.id] = {};
			message.channel.send('Queue has been cleared, use >add to start playing music again.')
			voiceChannel.leave()
		}

		if (command === "pause") {
			dispatcher.pause();
			message.channel.send('Music has been paused, use >resume to start playing music again.')
		}

		if (command === "resume") {
			dispatcher.resume();
			message.channel.send('Music has been resumed.')
		}

		if (command === "skip") {
			if (queue === {}) return message.channel.send('Queue is empty, have no songs to skip.');
			message.channel.send('Current song has been skipped.')
			dispatcher.end();
		}
		if (command === "volume") {
			const volumetoset = parseInt(args.join(""))
			if (volumetoset > 200 || volumetoset < 0) return message.channel.send('Volume out of range!').then((response) => {
				response.delete(5000);
		    });
			if (isNaN(volumetoset)) return message.channel.send("Need to provide a valid number.")
			dispatcher.setVolume(volumetoset/100);
			message.channel.send(`Volume now set too: ${volumetoset}%`);
		}
	})
});

client.login("Your token");
