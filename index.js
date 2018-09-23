const config = require('./config.json');
const Discord = require('discord.js');
const mongoose = require('mongoose');
const playerBase = require('./db/player.model.js')

let dev_db_url = 'mongodb://patrickblackjr:remmie100600@ds123971.mlab.com:23971/playerbase'
let mongodb = mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(callback) {
  console.log('Connection successful.');
});

const client = new Discord.Client();

client.on('ready', async () => {
  console.log(`${client.user.username} loaded successfully.`);
});

client.on('message', message => {
  if (message.author.bot) return;
  
  const shortLinks = ["goo.gl", "shorte.st", "adf.ly", "bc.vc", "bit.ly", "bit.do", "soo.gd", "7.ly", "5.gp", "tiny.cc", "ouo.io", "zzb.bz", "adfoc.us", "my.su"]
  const swearWords = ["faggot", "gini", "kike", "n1gga", "n1gger", "nigg3r", "nigga", "nigger", "retard", "niqqa", "n1qqa", "niqqer", "n1qqer", "apples"]
  
  if (swearWords.some(word => message.content.toLowerCase().includes(word))) {
    message.delete();
    message.author.send(`Hey, please don't use that word in Perswayable's Discord. Thanks.`);
  }

  if (shortLinks.some(word => message.content.includes(word))) {
    message.delete();
    message.author.send(`Hey, please don't send short links in Perswayable's Discord. You can post the link, just send the full length one. Thanks :)`);
  }
  
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'custom') {
    let team = args[0];
    let id   = args[1];
    let ign  = args[2];
    let role = message.guild.roles.get(config.dev.roleId); // TODO: change in production
    let member = message.member;

    if (team === 'hunter') {
      if (message.member.roles.has(role.id)) {
        message.reply(
          `You're already in the queue. You can't join again. Sorry!`
        );
      }
      else {
        message.reply(
          `I've added you to the queue for **${team}**. Remember this is *NOT* a guarantee. Your ID you entered is: **${id}** and the IGN you entered is: **${ign}**.`
        );
        client.channels
          .get(config.dev.channelIds.hunters) // TODO: change in production
          .send(`${message.author} - ${id} - ${ign}`);
        member.addRole(role).catch(console.error);
      }
    }

    else if (team === 'survivor') {
      let role = message.guild.roles.get(config.dev.roleId); // TODO: change in production
      let member = message.member;
      if (message.member.roles.has(role.id)) {
        message.reply(
          `You're already in the queue. You can't join again. Sorry!`
        );
      } else {
        message.reply(
          `I've added you to the queue for **${team}**. Remember this is *NOT* a guarantee. Your ID you entered is: **${id}** and the IGN you entered is: **${ign}**.`
        );
        client.channels
          .get(config.dev.channelIds.survivors) // TODO: change in production
          .send(`${message.author} - ${id} - ${ign}`);
        member.addRole(role).catch(console.error);
      }
    }
  }
  if (command === 'tourney') {
    let ign = args[0];
    let id  = args[1];
    new Player({
      ign: ign,
      id: id
    })
    message.reply(`Tourney test:
    IGN: ${ign}
    ID: ${id}
    `)
  }
});

client.login(config.dev.token); // TODO: change in production