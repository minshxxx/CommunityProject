const axios = require("axios");
const cheerio = require("cheerio");
const calcDate = require('../calcDate')
const db = require('../database')

module.exports.getData = async () => {
  let page1 = await Crawling('https://www.clien.net/service/recommend');
  
  const newArr = [
    ...page1,
  ]

  newArr.forEach((item) => {
    db.inputData(item)
  })
}

const Crawling = async (url) => {
  try {
    const html = await axios.get(url)

    let ulList = [];

    const $ = cheerio.load(html.data);
    const $bodyList = $("div.recommend_underList").children();

    $bodyList.each((i, item) => {
      ulList[i] = {
        site: `클량`,
        subject: $(item).find('span.subject_fixed').text(),
        comment: $(item).find('span.rSymph05').text(),
        url: $(item).find('a.list_subject').attr('href'),
        author: $(item).find('div > div.list_author > span.nickname > span').text(),
        date: $(item).find('div > div.list_time > span > span').text(),
        view: '-',
        like: '-'
      }
    })

    return ulList;

  } catch (error) {
    console.error(error);
  }
}

getComment = (val) => {
    if(val == '[]')
        return ''
    return val
}

getLike = (val) => {
    if(val == '-')
        return '0'
    return val
}