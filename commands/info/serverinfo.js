const kaiz = require('kaizoffical')
const title = "Thông tin máy chủ"
const name = "Thông tin máy chủ"
const id = "ID chủ sở hữu"
const owner = "Chủ sở hữu"
const member = "Tổng thành viên"
const bot = "Tổng bot"
const user = "Tổng người dùng"
const role = "Tổng role"
const emoji = "Tổng emoji"
const text = "Tổng kênh văn bản"
const voice = "Tổng kênh hội thoại"
const news = "Tổng kênh thông báo"
const category = "Tổng danh mục kênh"
const footer = "Bản quyền thuộc về Dio Lolicon"

module.exports = {
    name: 'serverinfo',
    category: 'info',
    aliases: ['server'],
    usage: 'serverinfo',
    run: async (client, message, args, cmd) => {
        serverinfo(
            title, name, id, owner, member, bot, user, role, emoji, text, voice, news, category, footer, message
        ) 
    }
}