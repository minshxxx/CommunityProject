const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require('iconv-lite');

const getData2 = async () => {
  let page1 = await getData("https://www.ppomppu.co.kr/zboard/zboard.php?id=humor&hotlist_flag=999");
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
    let html = await axios.get(url, {responseType: "arraybuffer"});
    const content = iconv.decode(html.data, "EUC-KR").toString()

    let ulList = [];
    const $ = cheerio.load(content);
    const $bodyList = $("table.title_bg").find('tr.list0, tr.list1');
    

    $bodyList.each((i, item) => {
      ulList[i] = {
        site: `뽐뿌`,
        title: $(item).find('td.list_vspace a font.list_title').text(),
        comment: $(item).find('span.list_comment2').text().trim(),
        url: `https://www.ppomppu.co.kr/zboard/${$(item).find('a:has(> font.list_title)').attr('href')}`,
        author: $(item).find('span.list_name').text(),
        date: $(item).find('td nobr.eng').text().trim(),
        view: $(item).find('tr td.list_vspace:last-child').text(),
        like: getLike($(item).find('tr td.list_vspace:nth-child(5n)').text())
      }
    })

    return ulList
  } catch (error) {
    console.error(error);
  }
}

const getLike = (val) => {
  const ret = val.trim().split(' -')[0]
  return ret === '' ? '0' : ret
}



module.exports.getData2 = getData2;