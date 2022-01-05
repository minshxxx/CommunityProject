const db = require('./models')

const inputData = (siteData) => {
    console.log(`inputData 함수 호출`)
    db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        db.sequelize.sync();
    })
    .then(() => {
        console.log('DB Sync complete.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    
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