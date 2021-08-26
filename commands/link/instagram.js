const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const fetch = require("node-fetch");

module.exports = {
    name: "instagram",
    aliases: ["insta"],
    category: "link",
    description: "Tìm một tài khoản instagram tuyệt vời ",
    usage: "insta <name>",
    run: async (client, message, args, cmd) => {
        const name = args.join(" ");

        if (!name) {
            return message.reply("Có lẽ sẽ hữu ích khi thực sự tìm kiếm ai đó...!")
                .then(m => m.delete(5000));
        }

        const url = `https://instagram.com/${name}/?__a=1`;
        
        let res; 

        try {
            res = await fetch(url).then(url => url.json());
        } catch (e) {
            return message.reply("Tôi đã không tìm thấy tài khoản... :(")
                .then(m => m.delete(5000));
        }

        const account = res.graphql.user;

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${name}`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Profile information", stripIndents`**- Username:** ${account.username}
            **- Tên đầy đủ:** ${account.full_name}
            **- Tiểu sử:** ${account.biography.length == 0 ? "none" : account.biography}
            **- Bài đăng:** ${account.edge_owner_to_timeline_media.count}
            **- Người theo dõi:** ${account.edge_followed_by.count}
            **- Đang theo dõi:** ${account.edge_follow.count}
            **- Tài khoản cá nhân:** ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`);

        message.channel.send(embed);
    }
}