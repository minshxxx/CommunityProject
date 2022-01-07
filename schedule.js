const schedule = require('node-schedule')

const fmkorea = require('./sites/fmkorea')
const humoruniv = require('./sites/humoruniv')
const ppomppu = require('./sites/ppomppu')
const todayhumor = require('./sites/todayhumor')
const Ygosu = require('./sites/Ygosu')

module.exports = async() => {
    await fmkorea.getData2();
    await humoruniv.getData2();
    await ppomppu.getData2();
    await todayhumor.getData2();
    await Ygosu.getData2();
    
    schedule.scheduleJob('0 0/30 * * * *', async () => {
        await fmkorea.getData2();
        await humoruniv.getData2();
        await ppomppu.getData2();
        await todayhumor.getData2();
        await Ygosu.getData2();
    })
}