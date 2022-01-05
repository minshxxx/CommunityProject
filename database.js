const db = require('./models')

const inputData = (siteData) => {
    db.Sites.destroy({
        where: {
            site: siteData.site,
        }
    })

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

const outputData = () => {

}

module.exports = {inputData, outputData}