module.exports = {
    name: 'youtube',
    category: 'link',
    aliases: ['yt'],
    description: 'Lấy link youtube ',
    usage: `yt`,
    run: (client, message, args, cmd) => {
        message.channel.send('@everyone https://ctgs.ga/piemusicbot');
    }
}