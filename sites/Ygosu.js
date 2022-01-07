const axios = require("axios");
const cheerio = require("cheerio");
const calcDate = require('./../calcDate')
const db = require('./../database')

const getData2 = async () => {
  let page1 = await getData('https://ygosu.com/community/real_article');
  // let page2 = await getData("http://www.todayhumor.co.kr/board/list.php?table=bestofbest&page=2");
  // let page3 = await getData("http://www.todayhumor.co.kr/board/list.php?table=bestofbest");
  
  const newArr = [
    ...page1,
    // ...page2,
    // ...page3
  ]

  newArr.forEach((item) => {
    db.inputData(item)
  })
}

const getData = async (url) => {
  try {
    const html = await axios.get(url)

    let ulList = [];

    const $ = cheerio.load(html.data);
    const $bodyList = $("#contain > div.board_t > div.board_left > div.board_wrap > table").find('tr:not(tr.notice)');

    $bodyList.each((i, item) => {
      ulList[i] = {
        site: `와고`,
        subject: $(item).find('td.tit > a').text(),
        comment: getComment(`[${$(item).find('td.tit > span > strong').text()}]`),
        url: `${$(item).find('td.tit > a').attr('href')}`,
        author: $(item).find('td.name > a').text().trim(),
        date: calcDate.today() + ' ' + $(item).find('td.date').text(),
        view: '-',
        like: getLike($(item).find('td.vote').text().trim())
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

module.exports.getData2 = getData2;