const axios = require("axios");
const cheerio = require("cheerio");
const db = require('./../database')
const calcDate = require('./../calcDate')

const getData2 = async () => {
  let page1 = await getData("http://www.todayhumor.co.kr/board/list.php?table=bestofbest");
  let page2 = await getData("http://www.todayhumor.co.kr/board/list.php?table=bestofbest&page=2");
  // let page3 = await getData("http://www.todayhumor.co.kr/board/list.php?table=bestofbest");
  
  const newArr = [
    ...page1,
    ...page2,
    // ...page3
  ]

  newArr.each((item) => {
    db.inputData(item)
  })

}

const getData = async (url) => {
  try {
    let html;
    html = await axios.get(url);

    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("table.table_list tbody").find('tr.view');
    
    $bodyList.each((i, item) => {
      ulList[i] = {
        site: `오유`,
        subject: $(item).find('td.subject a').text(),
        comment: $(item).find('td.subject span.list_memo_count_span').text(),
        url: `http://todayhumor.co.kr${$(item).find('td.subject a').attr('href')}`,
        author: $(item).find('td.name').text(),
        date: calcDate.todayhumor($(item).find('td.date').text()),
        view: $(item).find('td.hits').text(),
        like: $(item).find('td.oknok').text()
      }
    })
    
    return ulList
  } catch (error) {
    console.error(error);
  }
}

module.exports.getData2 = getData2;