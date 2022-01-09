const db = require('./models')
const moment = require(`moment`);
const sequelize = require('sequelize');

const Op = sequelize.Op

module.exports.deleteBasedHours = (hours) => {
    db.Sites.findAll({
      where: {
          date: {
              [Op.lte] : moment().subtract(hours, 'hours').toDate()
          }
      }
    }).then( datas => {
        db.Sites.destroy({
            where: {
                date: {
                    [Op.lte] : moment().subtract(hours, 'hours').toDate()
                }
            }
        })

        Object.keys(datas).map( (key, index) => {
            console.log(`DELETE\tSITE\t${datas[index].site}\tSUBJECT\t${datas[index].subject}`)
        });
    })
}

module.exports.inputData = (siteData) => {
    db.Sites.findOne({
        where: {
            site: siteData.site,
            subject : siteData.subject
        }
    }).then( data => {
        if(siteData.subject != '' && siteData.author != ''){
            // if(data){
            //     console.log(`${siteData.site}의 ${siteData.subject}은 중복입니다.`)
            // }
            if(!data){
                console.log(`INSERT\tSITE\t${siteData.site}\tSUBJECT\t${siteData.subject}`)
                    db.Sites.create({
                        site: siteData.site,
                        subject : siteData.subject,
                        url : siteData.url,
                        author : siteData.author,
                        date : siteData.date,
                        comment : siteData.comment,
                        view : siteData.view,
                        like : siteData.like
                    })
            }
        }
    })
}