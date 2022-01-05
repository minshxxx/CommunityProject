const axios = require("axios");
const cheerio = require("cheerio");
const db = require('./database')
const calcDate = require('./calcDate')

const getData2 = async () => {
  let page1 = await getData("https://www.fmkorea.com/best2");
  // let page2 = await getData("http://www.todayhumor.co.kr/board/list.php?table=bestofbest");
  // let page3 = await getData("http://www.todayhumor.co.kr/board/list.php?table=bestofbest");
  
  const newArr = [
    ...page1,
    // ...page2,
    // ...page3
  ]
  
  return newArr;
}

const getData = async (url) => {
  try {
    let html;
    html = await axios.get(url);

    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.fm_best_widget").find('li.li_best2_pop0 div.li');
    
    $bodyList.each((i, item) => {
      ulList[i] = {
        site: `펨코`,
        subject: getTitle($(item).find('h3.title a').text(), $(item).find('h3.title a span.comment_count').text()),
        comment: $(item).find('h3.title a span.comment_count').text(),
        url: `https://www.fmkorea.com/${$(item).find('h3.title a').attr('href')}`,
        author: $(item).find('span.author').text(),
        date: calcDate.fmkorea($(item).find('span.regdate').text().trim()),
        view: '-',
        like: $(item).find('a.pc_voted_count span.count').text()
      }
      db.inputData(ulList[i])
    })
    return ulList
  } catch (error) {
    console.error(error);
  }
}

getData2()

const getTitle = (val, comment) => {
  const ret = val.trim().split(comment)[0]
  return ret
}



module.exports.getData2 = getData2;