const { TeamMember } = require("discord.js");

module.exports = {
    name: 'say',
    category: 'fun',
    aliases: ['s'],
    usage: 'say <@msg>',
    run: (client, message, args, cmd) => {
        if (message.deletable) message.delete();
        message.channel.send(args.join(' '));
    }
}