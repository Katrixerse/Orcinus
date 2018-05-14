const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
   let choice = args.join(' ').toLowerCase();
      const choices = ['paper', 'rock', 'scissors', choice, 'scissors', 'rock', 'paper', 'rock', 'scissors', 'paper'];
        const response = choices[Math.floor(Math.random() * choices.length)];                                            
         if (choice === 'rock') {
            if (response === 'rock') return message.reply('I picked rock! and you picked rock \n Oh no its a tie!');
            else if (response === 'paper') return message.reply('I picked paper! and you picked rock \n Paper Wins!');
            else return message.reply('I picked scissors! and you picked rock \n Rock Wins');
        } else if (choice === 'paper') {
            if (response === 'rock') return message.reply('I picked rock! and you picked paper \n Paper Wins!');
            else if (response === 'paper') return message.reply('I picked paper! and you picked paper \n Oh no its a tie!');
            else return message.reply('I picked scissors! and you picked paper \n Scissors Wins!');
        } else if (choice === 'scissors') {
            if (response === 'rock') return message.reply('I picked rock! and you picked scissors \n Rock Wins!');
            else if (response === 'paper') return message.reply('I picked paper! and you picked scissors \n Scissors Wins!');
            else return message.reply('I picked scissors! and you picked scissors \n Oh no its a tie!');
        } else {                                 
            if (response === 'rock') return message.reply('I picked rock! and you picked ' + choice + '\n Rock Wins!');
            else if (response === 'paper') return message.reply('I picked paper! and you picked ' + choice + '\n Paper Wins!');
            else if (response === 'scissors') return message.reply('I picked scissors! and you picked ' + choice + '\n Scissors Wins!');
            else if (response === choice) return message.reply('I picked ' + choice + '! and you picked ' + choice + '\n Oh no its a tie!');
  }
}