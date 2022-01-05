const moment = require('moment')

const calcDate = (str) => {
    const today = moment();
    let ret;
    if(str.includes('시')){
        const hours = Number(str.split('시')[0].trim())
        ret = today.subtract(hours, 'hours').format("YYYY-MM-DD HH:mm:ss")
    }
    if(str.includes('분 전')){
        const minutes = Number(str.split('분')[0].trim())
        ret = today.subtract(minutes, 'minutes').format("YYYY-MM-DD HH:mm:ss")
    }
    if(str.includes('초 전')){
        const seconds = Number(str.split('초')[0].trim())
        ret = today.subtract(seconds, 'seconds').format("YYYY-MM-DD HH:mm:ss")
    }
    return ret;
}

module.exports = calcDate