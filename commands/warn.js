exports.run = (client, message, args, level) => {
  message.reply(`:no_entry_sign: Yo homes, this command isn't ready yet. :no_entry_sign:`)
}

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'warn',
  category: 'In Development',
  description: 'in progress',
  usage: 'warn [@user] [reason] (without brackets)'
}