//made by ric
const Discord = require(`discord.js`);
const music = require('discord.js-music-v11');
const ddiff = require('return-deep-diff');
const moment = require('moment');
const bot = new Discord.Client();

const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./Config/config.json", "utf8"));


//Bot loaded up in console
bot.on("ready", function() {
  console.log(`[${moment().format('YYYY-MM-DD hh:mm:ss a')}] Loaded up as ${bot.user.tag}`);
  console.log(`[${moment().format('YYYY-MM-DD hh:mm:ss a')}] Version ${config.version}`);
  console.log(`[${moment().format('YYYY-MM-DD hh:mm:ss a')}] - made by ric -`);

  bot.user.setStatus(`Online`);
  bot.user.setGame(`.help for commands`);

});

bot.on("message", function(message) {
  if (message.author.equals(bot.user)) return;
    console.log(`[${moment().format('YYYY-MM-DD hh:mm:ss a')}] USER: ${message.author.tag} | MESSAGE: \"` + message.content + `\" | SERVER: ${message.guild} | CHANNEL: ${message.channel.name}`);
});

music(bot, {
  prefix: ".",
  maxQueueSize: "10",
  anyoneCanSkip: true,
  clearInvoker: false,
  volume: "15",
  global: true,
});

bot.login(config.token); //change token in config.json

//Commands
bot.on("message", function(message, member) {
  if (message.author.equals(bot.user)) return;
  if (!message.content.startsWith(config.prefix)) return; //prefix can be changed in config.json

  var args = message.content.substring(config.prefix.length).split(" ");
  var guild = message.guild;
  var result = args.join(' ');

  switch (args[0].toLowerCase()) {
    case "ping": //Ping
      var embed =  new Discord.RichEmbed()
        .setDescription(`Your ping is ${Date.now() - message.createdTimestamp}ms.`)
        .setColor(0x0789DD)
      message.author.send(embed);
      message.channel.send(`${message.author}, check your DMs.`);
      break;
    case "surprise": //Random surprise I put in
      var embed = new Discord.RichEmbed()
        .setAuthor(`WILLIAM94299364 IS GROSS`, message.author.displayAvatarURL)
        .setURL(`https://www.youtube.com/watch?v=pYCiRpZsvr8`)
        .setImage(`https://i.imgur.com/2jyumrD.jpg`)
        .setFooter(`There's a link in the title...`)
        .setColor(0x358EF9)
      message.author.send(embed);
      message.channel.send(`${message.author}, check your DMs.`);
      break;
    case "help": //Brings up commands
      var embed = new Discord.RichEmbed()
        .setAuthor("Commands", message.author.displayAvatarURL)
        .setDescription(`The commands with "*" are for admins.`)
        .addField(`*.help*`, `*Shows commands.*`, true)
        .addField(`*.ping*`, `*Shows your current ping.*`, true)
        .addField(`*.surprise*`, `*A little surprise. (;*`, true)
        .addField(`*.play*`, `*.play [url/name]*`, true)
        .addField(`.skip`, `*.skip [amount]*`, true)
        .addField(`.pause`, `*Pauses the music.*`, true)
        .addField(`.resume`,`*Resumes the music.*`, true)
        .addField(`.volume *`, `*.volume [1-200]*`, true)
        .addField(`.queue`, `*Shows the queue.*`, true)
        .addField(`.clearqueue`, `*Clears queue.*`, true)
        .addField(`.purge *`, `*Clears chat.*`, true)
        .addField(`.bug`, `*To make a bug report.*`, true)
        .addBlankField()
        .setFooter(`Bitch to **ric#0217** or in the RIC-DEV discord if there's an issue with the bot.`)
        .setColor(0x0789DD)
      message.author.send(embed);
      message.channel.send(`${message.author}, check your DMs.`);
      break;
      //music-bot. Ext-commands to avoid "Invalid command."
    case "play":
      break;
    case "skip":
      break;
    case "pause":
      break;
    case "resume":
      break;
    case "volume":
      break;
    case "queue":
      break;
    case "clearqueue":
      break;
    case "purge": //purge command
      let modPurge = message.guild.roles.find("name", "Nut Buster");
      if (message.member.roles.has(modPurge.id)) {
        let messagecount = parseInt(result)
          message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
          message.channel.send(`Messages deleted.`);
      } else {
        message.reply(`don't have permission to use that command. Try typing .help to see what commands you can use.`);
      };
      break;
    case "bug":
      var embed = new Discord.RichEmbed()
        .setAuthor(`Have a bug to report?`, message.author.displayAvatarURL)
        .setURL(`https://discord.gg/WTfygKB`)
        .setDescription(`If there's a bug, bitch it to @ric#0217 or in the RIC-DEV discord.`)
        .setFooter(`Discord link is in the title.`)
        .setColor(0xDC1313)
      message.author.send(embed);
      message.channel.send(`${message.author}, check your DMs.`);
      break;
    case "traps":
      var embed = new Discord.RichEmbed()
        .setAuthor(`Are traps gay?`, message.author.displayAvatarURL)
        .setImage(`https://i.imgur.com/QMjiRfw.jpg`)
        .setFooter(`Traps ARE gay. -Malik Obama`)
      message.author.send(embed);
      message.channel.send(`${message.author}, check your DMs.`);
      break;
    default: //If the command is invalid.
      var embed = new Discord.RichEmbed()
        .setAuthor("Invalid command.", message.author.displayAvatarURL)
        .setFooter(`Try typing .help to bring up the commands!`)
        .setColor(0xDC1313)
      message.channel.send(embed);
  }
});

// Event when a user joins the discord server.
bot.on("guildMemberAdd", function(member, message, guild) {
  var embed = new Discord.RichEmbed()
    .setAuthor(`Welcome to ${member.guild.name}!`, `https://i.imgur.com/epzCjm3.jpg`)
    .addField(`**#Infomation**`, `*Informations about the discord server.*`)
    .addField(`**#Announcements**`, `*Where all the updates for the server will be.*`)
    .addField(`**#Main**`, `*The general chat*`)
    .addField(`**.help**`, `*List of commands for the ric-bot. The other bots help command will be in their status.*`)
    .setDescription(`*If you need anything, contact a (RANK) or higher to help you out.*`)
    .addBlankField()
    .setFooter(`Traps ARE gay -Malik Obama`)
    .setColor(0xDC1313)
  member.send(embed);
//Records users in console logs
  console.log(`[${moment().format('YYYY-MM-DD hh:mm:ss a')}] USER: ${member.user.tag} | ACTION: joined server | SERVER: ${member.guild.name}`);

//Records joined users on to dicord chat
  const channel = member.guild.channels.find('name', 'test');
  var embed = new Discord.RichEmbed()
    .setAuthor(`${member.user.tag} | ${member.user.id}`, member.user.displayAvatarURL)
    .setFooter(`User joined | ${moment().format('MMM, DD YYYY, h:mm:ss a')}`)
    .setColor(0x58D68D)
  channel.send(embed);

  member.addRole(member.guild.roles.find("name", "Sand Nigger")); //change the name of the role to any role you like.

});

bot.on("guildMemberRemove", function(member, message) {
  var embed = new Discord.RichEmbed()
//Records users in console logs
  console.log(`[${moment().format('YYYY-MM-DD hh:mm:ss a')}] USER: ${member.user.tag} | ACTION: left server | SERVER: ${member.guild.name}`);

//Records left users on to discord chat
  const channel = member.guild.channels.find('name', 'test');
  var embed = new Discord.RichEmbed()
    .setAuthor(`${member.user.tag} | ${member.user.id}`, member.user.displayAvatarURL)
    .setFooter(`User left | ${moment().format('MMM, DD YYYY, h:mm:ss a')}`)
    .setColor(0xF5B041)
  channel.send(embed);
});
