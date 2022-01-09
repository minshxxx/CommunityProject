const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
const db = require('./../database')
const calcDate = require('./../calcDate')

module.exports.getData = async () => {
  let page1 = await Crawling("https://www.ppomppu.co.kr/hot.php?category=2");
  
  const newArr = [
    ...page1,
  ]
  
  newArr.forEach((item) => {
    db.inputData(item)
  })
}

const Crawling = async (url) => {
  try {
    let html = await axios.get(url, {responseType: "arraybuffer"});
    const content = iconv.decode(html.data, "EUC-KR").toString()

    let ulList = [];
    const $ = cheerio.load(content);
    const $bodyList = $("body > div > div.contents > div.container > div:nth-child(2) > div.board_box > table.board_table > tbody").find('tr[class^=line]');

    $bodyList.each((i, item) => {
      ulList[i] = {
        site: `뽐뿌`,
        subject: $(item).find('td:nth-child(4) > a').text(),
        comment: `[${$(item).find('span.list_comment2').text().trim()}]`,
        url: `https://www.ppomppu.co.kr${$(item).find('td:nth-child(4) > a').attr('href')}`,
        author: $(item).find('td:nth-child(2)').text(),
        date: calcDate.ppomppu($(item).find('td:nth-child(5)').text()),
        view: $(item).find('td:nth-child(7)').text(),
        like: getLike($(item).find('td:nth-child(6)').text())
      }
    })
    
    return ulList;
  } catch (error) {
    console.error(error);
  }
}

const getLike = (val) => {
  const ret = val.trim().split(' -')[0]
  return ret === '' ? '0' : ret
}