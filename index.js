const { Client, MessageEmbed, Util, Collection } = require('discord.js');
const client = new Client
const { token } = require('./config.json');
const { readdirSync } = require('fs');
const { Player, Discord } = require("discord-player");
const config = require('./config.json');
const db = require('quick.db')
require('dotenv')

client.on("ready", () =>{
    console.log(`${client.user.username} is Starting!`)


    client.user.setPresence({
        activity: {
            name: `${client.guilds.cache.size} máy chủ! || ${client.users.cache.size} member || \n Đeo khẩu trang khi ra ngoài `,
            type: 'LISTENING'
        },
        status: 'dnd'
    })
});

client.on("message", async message => {
    if (message.author.bot) return;
    if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`Your afk status have been removed (${info})`)
    }
    //checking for mentions
    if(message.mentions.members.first()) {
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.channel.send(message.mentions.members.first().user.tag + ":" + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
        }else return;
    }else;
    const prefix = '>'
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (command.category === 'music' && !message.member.voice.channel) return message.channel.send("Vui lòng vào room voice🎶 để sử dụng lệnh");
        command.run(client, message, args, cmd);
    }

})



client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


client.login(token)