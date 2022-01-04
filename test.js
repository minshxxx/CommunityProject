const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getData = async () => {
  try {
    const html = await axios.get("http://www.todayhumor.co.kr/board/list.php?table=bestofbest");

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
  console.log(newStr)
  console.log(newStr.length)
  for(var i = 0; i < newStr.length - 1; i++){
    retStr += newStr[i];
  }
  console.log(retStr)
  return retStr;
}

const getComment = (str) => {
  const newStr = str.trim().split('[')[1].split(']')
  return '[' + newStr[0] + ']';
}

module.exports.getData = getData;