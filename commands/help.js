const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
var maincommands = [
    "help - Bot will dm you a link with all of the commands.",
    "ping - Bot will respond with pong and time it took.",
    "embed [text] - Will send a embed with [text].",
    "botinfo - Will get all the bots information. ",
    "reminder [minutes] [text] - Will send you a reminder for [text] in [time]. ",
    "invite - Will send you a invite for the bot.",
    "serverinfo - Will get the current servers info.",
    "serveremojis - Will get the servers emojis.",
    "serverroles - Will get the servers roles.",
    "credits - Will tell you who created the bot and the contributers.",
    "dm - Bot will dm the user with your message.",
    "getchannels - Bot will fetch the text/voice channel count.",
    "membercount - Bot will fetch the member/bot count.",
    "prefix - Will change the bots prefix for the guild.",
    "suggestion - Can send a suggestion in the server and vote for it.", 
    "issue [details] - Report a issue with the bot.", 
    "support - Sends you the support link for the discord server. ",
    "uptime - Gets the bots uptime.",
    "whois @Someone - Gets the users info.",
    "mdn [text] - Bot will search mdn (mozilla-developer-network) for a answer"
]
var moderationcommands = [
    "ban @Someone [reason] - Will ban that user from the server.",
    "unban @Someone [reason] - Will unban that user from the server.",
    "softban [ID] [reason] - Will ban then unban that user from the server.",
    "hackban [ID] [reason] - Will ban that ID/user from the server.",
    "mute @Someone [minutes] [reason] - Will mute that user from the server for the time. ",
    "unmute @Someone [reason] - Will unmute that user from the server.",
    "purge [amount]/@Someone [reason/amount] - Will purge messages from the server/user. ",
    "clean [amount] - Will delete the bots messages.",
    "antiraid [minutes] [reason] - Will disable the default role to send messages.",
    "giverole @Someone [rolename] - Will give a user the role you specified.",
    "takerole @Someone [rolename] - Will take the role you specified away from the user.",
    "roleall [rolename] - Will give all users the role you specified.",
    "rroleall [rolename] - Will take the role from all users that you specified.",
    "slowmode [seconds] - Will allow users to send a message every x seconds.",
    "automod [enable/disable] [automodtool] - Will Turn on the bots automoderation.",
    "autorole [rolename] - Will give the role specified when a user joins.",
    "logs [1/2/3] - Will give options to edit logs settings.",
    "modonly - Will make commands work for mods only (mods/mods+ need at least kick perms to work).",
    "createrole [rolename] [rolecolor] - Will create a role with the color and name you want. ",
    "welcomeleave - Will give you all the options to control the wl system",
    "poll [text] - Will start a poll for your members too vote in.",
    "nick [text] - Will change the users nickname.",
    "warn - @Someone [reason] - Will warn the user wth [reason].",
    "warings @Someone - Will show the warnings the current user has.",
    "clearwarns @Someone - Will remove all the current warnings a user has."
] 
var funcommands = [
    "slap @Someone - Will send a image of you slapping that user.",
    "shit @Someone - Will send a image of you stepping on that user.",
    "buttslap @Someone - Will send a image buttslapping that user. [NSFW]",
    "rip @Someone - Will send a image paying respects to that user.",
    "trigger @Someone - Will send a image of that user being triggered.",
    "brazzers @Someone - Will send a image with the brazzers logo on that user.",
    "ohno @Someone - Will send a image of ohno with the text you specified.",
    "beautiful @Someone - Will send a image of that user in a picture frame.",
    "crush @Someone - Will send a image having a crush on that user",
    "delete @Someone - Will send a image deleting that user.",
    "jail @Someone - Will put the user behind bars.",
    "thuglife @Someone - Will put thuglife over a users avatar.",
    "rainbow @Someone - Will put a rainbow over a users avatar.",
    "approved @Someone - Will put approved over a users avatar.",
    "rejected @Someone - Will put rejected over a users avatar.",
    "wasted @Someone - Will put wasted over a users avatar.",
    "power @Someone - Will put the users avatar over the power character.",
    "tattoo @Someone - Will put the users avatar as a tattoo.",
    "8ball [question] - Bot will respond with a random 8ball response.",
    "coinflip - Bot will respond with heads or tails.",
    "yoda [text] - Bot will respond with text in yoda style.",
    "cat - Bot will send a random cat photo.",
    "roll [maxnumber] - Bot will roll the dice between 1 and max number",
    "achievement [text] - Will send you a mincraft achievement.",
    "avatar @Someone - Will get the users avatar.",
    "booksearch [query] - Will perform a booksearch with the [query] you want.",
    "currency [currency1] [currency2] [amount] - Will convert an amount of money to another currency.",
    "giphy [query] - Will send a gif based off of the text you provided.",
    "google [query] - Will do a google search and send the top 3 results."
]
var funcommands2 = [
    "reverse [text] - Will reverse the text you provided.",
    "roblox [query] - Will search for a user on roblox.",
    "rr - Will play russian roulette.",
    "say [text] - Make the bot say [text].",
    "sexyrate - Bot will rate your sexyness from 1 to 100.",
    "ship [text] [text] - Will ship you/item with another user/item.",
    "slots - Play a game of slots.",
    "temp [celsius/fahrenheit] [celsius/fahrenheit] [number] - Will convert a number from celsius fahrenheit.",
    "textflip [text] - Flips text upside down.",
    "today - Will say something that happened today in history.",
    "urban [word] - Will get the definition for a word.",
    "weather [location] - Will get the weather for a location.",
    "weeb - Will send a random anime image.",
    "wikipedia [query] - Will search on wikipedia for [query].",
    "wur - Play a game of would you rather.",
    "youtube [query] - Will do a youtube video search for [query].",
    "fish - Go fishing.",
    "shortenurl - Will reply with a shortned url of the one provided.",
    "choose [choice1] [choice2] - Bot chooses between 2 options you provide.",
    "nytimes [query] - Will get the most recent news article about [query].",
    "meme - Bot will send you a random trending meme from r/dankmemes.",
    "showerthoughts - Bot will send you a random post from r/showerthoughts",
    "notes - Bot will allow you to write notes and view notes.",
    "advice - Bot will send some random advice.",
    "compliment - Bot will compliment the user you tag.",
    "percentage [number1] [number2] - Bot will figure out the percent between 2 numbers."
]
var roleplaycommands = [
    "hug @Someone - Will send a image hugging that user.",
    "kiss @Someone - Will send a image kissing that user.",
    "marry @Someone - Will send a image marrying that user.",
    "high-five @Someone - Will send a image high-fiving that user.",
    "cuddle @Someone - Will send a image cuddling that user.",
    "fist-bump @Someone - Will send a image fist-bumping that user.",
    "poke @Someone - Will send a image poking that user.",
    "pat @Someone - Will send a image patting that user.",
    "punch @Someone - Will send a image punching that user.",
    "hold-hands @Someone - Will send a image holding that users hand.",
    "tackle @Someone - Will send a image tackle that user.",
    "drop-kick @Someone - Will send a image drop kicking that user."
]
var nsfwcommands = [
    "rule34 [query] - Will send a nsfw image based on the [query].", 
    "ass - Will send a random nsfw image with ass.",
    "tits - Will send a random nsfw image with tits.",
    "hentai - Sends a random hentai picture.",
    "funnyNSFW - Sends a random nsfw photo that may be funny."
]
var levelcommands = [
    "profile @Someone - Get someones profile.",
    "deposit [amount] - Will deposit [amount] into your bank.",
    "withdraw [amount] - Will withdraw [amount] from your bank. [5% fee]",
    "redeem [code] - Can redeem a code and get something in return for it.",
    "transfer @Someone [amount] - Allows you to transfer money to another user.",
    "leaderboard [cash/level] - Displays the top 10 in the guild.",
    "25 [betamount] - Bet on the dice if it rolls above 25 win x1.25 of your bet.",
    "50 [betamount] - Bet on the dice if it rolls above 50 win x1.50 of your bet.",
    "75 [betamount] - Bet on the dice if it rolls above 75 win x1.75 of your bet.",
    "99 [betamount] - Bet on the dice if it rolls above 99 win x2.00 of your bet.",
    "roulette [odd/even] [betamount] - Bet on roulette if you win get x1.25 your bet.",
    "rob @Someone - Can try to rob this user for up too 5,000 but dont get caught.",
    "work - Work for the day and earn some money. [cooldown: 10 mins]",
    "hack - Like work but you can make more money but can get a fine. [cooldown 15 mins]",
    "flipcoin [bet] [heads/tails] - Just like coinflip but get to bet money on it.",
    "\n",
    "These commands require MANAGE_GUILD",
    "givemoney @Someone [amount] - Allows you to give money to a user.",
    "takemoney @Someone [amount] - Allows you to take money from that user.",
    "givexp @Someone [amount] - Allows you to give money to a user.",
    "takexp @Someone [amount] - Allows you to give money to a user.",
    "profilesystem - Allows you to enable/disable leveling/cash in your server.",
]
var musiccommands = [
    "add [query] - Adds music to the queue.",
    "play - Will play the music in the queue.",
    "skip - Will skip the current song.",
    "queue - Will say the current queue.",
    "clearqueue - Will remove all the current songs in the queue",
    "pause - Will pause the current music.",
    "resume - Will resume the current music."
]
exports.run = (client, message, args) => { 
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
     const prefixtouse = row.prefix
     const embed10 = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setThumbnail(client.user.avatarURL)
        .setTitle("Command: " + prefixtouse + "help")
	    .addField("Usage", prefixtouse + "help [number]")
        .addField("Options", "[1] - Main commands. \n[2] - Moderation commands.\n[3] - Fun commands. \n[4] - Fun commands page 2. \n[5] - Roleplay comannds. \n[6] - Nsfw commands. \n[7] - Level/Gamble commands.\n[8] - Music Commands.")
        .addField("Example", prefixtouse + "help 3")
        .setDescription("Description: " + "Used to get a list of commands.");

        const numberpicked = parseInt(args[0])
        if (isNaN(numberpicked)) return message.channel.send(embed10)
        if (numberpicked === 1) {

            const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle("Main commands")
            .setDescription(maincommands)
            message.author.send(embed).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else if (numberpicked === 2) {
            const embed2 = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle("Moderation commands")
            .setDescription(moderationcommands)
            message.author.send(embed2).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else if (numberpicked === 3) {
                const embed3 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Fun commands")
                .setDescription(funcommands)
                message.author.send(embed3).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else if (numberpicked === 4) {
                const embed4 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Fun commands page 2")
                .setDescription(funcommands2)
                message.author.send(embed4).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else if (numberpicked === 5) {
                const embed5 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Roleplay commands")
                .setDescription(roleplaycommands)
                message.author.send(embed5).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else if (numberpicked === 6) {
                const embed6 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("NSFW commands")
                .setDescription(nsfwcommands)
                message.author.send(embed6).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else if (numberpicked === 7) {
                const embed7 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Level/Gamble commands")
                .setDescription(levelcommands)
                message.author.send(embed7).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else if (numberpicked === 8) {
                const embed8 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Music commands")
                .setDescription(musiccommands)
                message.author.send(embed8).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else {
            message.channel.send("Did not select valid options")
        }
    })
}
   
