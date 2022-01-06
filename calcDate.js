const moment = require('moment')


module.exports = {
    fmkorea : (str) => {
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
    },
    todayhumor : (str) => {
        const year = `20${str.split('/')[0]}`
        const month = `${str.split('/')[1].split('/')[0]}`
        const day = `${str.split('/')[2].split(' ')[0]}`

        const hour = `${str.split(' ')[1].split(':')[0]}`
        const minute = `${str.split(':')[1]}`

        const ret = `${year}-${month}-${day} ${hour}:${minute}:00`
        
        return ret
    },
    ppomppu : (str) => {
        const hour = `${str.split(':')[0]}`
        const minute = `${str.split(':')[1]}`
        const second = `${str.split(':')[2]}`
        
        const date = moment().set(
            {
                'hour': hour, 
                'minute' : minute,
                'second' : second
            }
        );

        const ret = date.format('YYYY-MM-DD HH:mm:ss')
        
        return ret
    }
}