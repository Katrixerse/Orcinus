# Orcinus
Written in discord.js of course 

If you find any bugs please make a issue so i can look into it and fix it

Made By:
- SyntheticGenerations (me)
- dragonfire535 - Some commands
- YorkAARGH - How to use sqlite from this guide https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/coding-guides/storing-data-in-an-sqlite-file.html

 will use sqlite instead of jsons to store data (Better this way fs had issues which cause it to currupt if your bot gets in to many servers and is constantly reading/writing data)

--------------------------------------------------------

Hosting

First, download all the files and put them in a folder.

Need to create a new app at https://discordapp.com/developers/applications/me/create and then need to fill out the bots name and select its avatar then create it. Once done that find where is says Bot and click create a bot user and hit yes, do it

Now you want to go back to bot go to token and click token: click to reveal this will show you the bot token now edit config.json in assets where it says, "token": "Your token" with your bot token once done click save.

Now you have done that you will need NodeJs installed can get it from https://nodejs.org/en/ so you can start running the bot.

Now right click the folder in an empty space where you put the files in then click open command prompt.

Need to install each of these packages with npm install [packagename] without the brackets and replace package name with the ones below.

Packages Needed

- discord.js
- ms
- superagent
- snekfetch
- request
- request-promise-native
- urban
- chrono-node
- moment
- windows-build-tools
- node-gyp
- canvas
- canvas-constructor
- fs-nextra
- cheerio
- got
- sqlite

When done downloading the dependencies, run node Main.js, to start the bot.

If there is a problem or an error please make an issue.

If you want to run this bot while not having the console or terminal open, use nodemon or pm2 (ex. pm2 start Main.js)
