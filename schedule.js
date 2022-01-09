const schedule = require('node-schedule')

const db = require('./database')

const fmkorea = require('./sites/fmkorea')
const humoruniv = require('./sites/humoruniv')
const ppomppu = require('./sites/ppomppu')
const todayhumor = require('./sites/todayhumor')
const Ygosu = require('./sites/Ygosu')

module.exports = async() => {
    db.deleteBasedHours(48)
    await fmkorea.getData();
    await humoruniv.getData();
    await ppomppu.getData();
    await todayhumor.getData();
    await Ygosu.getData();
    
    schedule.scheduleJob('0 0/30 * * * *', async () => {
        db.deleteBasedHours(48)
        await fmkorea.getData();
        await humoruniv.getData();
        await ppomppu.getData();
        await todayhumor.getData();
        await Ygosu.getData();
    })
}