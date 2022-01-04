const axios = require("axios");
const cheerio = require("cheerio");

const getData2 = async () => {
  let page1 = await getData("http://www.todayhumor.co.kr/board/list.php?table=bestofbest");
  let page2 = await getData("http://www.todayhumor.co.kr/board/list.php?table=bestofbest");
  let page3 = await getData("http://www.todayhumor.co.kr/board/list.php?table=bestofbest");
  
  const newArr = [
    ...page1,
    ...page2,
    ...page3
  ]
  
  return newArr;
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
        title: getTitle($(item).find('td.subject').text()),
        comment: getComment($(item).find('td.subject').text()),
        url: `http://todayhumor.co.kr${$(item).find('td.subject a').attr('href')}`,
        author: $(item).find('td.name').text(),
        date: $(item).find('td.date').text(),
        view: $(item).find('td.hits').text(),
        like: $(item).find('td.oknok').text()
      }
    })
    
    return ulList
  } catch (error) {
    console.error(error);
  }
}

const getTitle = (str) => {
  const newStr = str.trim().split('[')
  let retStr = ""
  for(var i = 0; i < newStr.length - 1; i++){
    retStr += newStr[i];
  }
  return retStr;
}

const getComment = (str) => {
  const newStr = str.trim().split('[')[1].split(']')
  return '[' + newStr[0] + ']';
}

module.exports.getData2 = getData2;