const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "meme",
    category: "fun",
    description: "Giử cho bạn một super meme",
    usage: 'meme',
    run: async (client, message, args, cmd) => {
        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const image = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setImage(image);

        message.channel.send(embed);
    }
}