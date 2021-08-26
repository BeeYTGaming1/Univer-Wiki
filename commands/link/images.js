const img = require('images-scraper')

const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name : 'image',
    category: 'link',
    aliases: ["picture"],
    description: "Tìm kiếm một bức ảnh trên google",
    usage: "image | picture <txt>",
    run : async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.channel.send('Vui lòng nhập một truy vấn tìm kiếm')

        const results = await google.scrape(query, 1)
        message.channel.send(results[0].url);
    }
}