const Discord = require('discord.js');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();
var aq = require('animequote');
const fetch = require("node-fetch")

module.exports =  {
  name: "anime",
  category: "info",
  description: "Search thông tin anime",
  usage: "anime <name>",
  run: async (client, message, args, cmd) => {
    //checking args
   if (!args[0]) {
     return message.channel.send("Hãy cho tôi tên bộ anime nào đó!");
      
    }
    //main part
        var search = message.content.split(/\s+/g).slice(1).join(" ");
        kitsu.searchAnime(search).then(async result => {
            if (result.length === 0) {
                return message.channel.send(`Không có kết quả cho **${search}**!`);
            }
          
          var anime = result[0]

            let embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
                .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
                .addField('❯\u2000\Thông tin', `•\u2000\**Tên Japan:** ${anime.titles.romaji}\n\•\u2000\**Độ tuổi phù hợp:** ${anime.ageRating}\n\•\u2000\**Hentai:** ${anime.nsfw ? 'Yes😏' : 'No😢'}`, true)
                .addField('❯\u2000\Số liệu thống kê', `•\u2000\**Xếp hạng:** ${anime.averageRating}\n\•\u2000\**Thứ tự xếp hạng:** ${anime.ratingRank}\n\•\u2000\**Độ nổi tiếng:** ${anime.popularityRank}`, true)
                .addField('❯\u2000\Trạng thái', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Ngày xuất bản:** ${anime.startDate}\n\•\u2000\**Ngày kết thúc:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
            
                .setThumbnail(anime.posterImage.original, 200, 200);
          

            return message.channel.send({ embed })
        }).catch(err => {
            console.log(err) //cathing error
            return message.channel.send(`No results found for **${search}**!`);
        });
    }

}