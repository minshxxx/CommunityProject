const axios = require("axios");
const cheerio = require("cheerio");

const getData2 = async () => {
  let page1 = await getData("https://www.dogdrip.net/dogdrip")
  let page2 = await getData("https://www.dogdrip.net/dogdrip?page=2")
  // let page3 = await getData("https://www.dogdrip.net/dogdrip?page=3")
  
  const newArr = [
    ...page1,
    ...page2,
    // ...page3,
  ]
  
  return newArr;
}

const getData = async (url) => {
  try {
    let html;
    html = await axios.get(url);
    
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("table.ed tbody").find('tr:not(tr.notice)');

    $bodyList.each((i, item) => {
      ulList[i] = {
        site: `갣립`,
        title: $(item).find('td.title span.title-link').text(),
        comment: `[${$(item).find('td.title span.text-primary').text()}]`,
        url: `${$(item).find('td.title a').attr('href')}`,
        author: $(item).find('td.author a').text(),
        date: $(item).find('td.time').text(),
        view: '',
        like: $(item).find('td.ed').text()
      }
    })

    return ulList
  } catch (error) {
    console.error(error);
  }
}

module.exports.getData2 = getData2;