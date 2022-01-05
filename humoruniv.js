const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const inputData = require('./database')

const func = async() => {
    try{
        const browser = await puppeteer.launch({
            "headless": true,
        })
        const page = await browser.newPage();

        await page.goto(`http://web.humoruniv.com/`, { waitUntil: ['load', 'networkidle0'] }); // WAIT for the page load finish. Provide wait options, you can read moe about it in documentation.
        await page.waitForSelector('#wrap_gnb > div.wrap_gnb > dl:nth-child(4) > dd:nth-child(2) > a:nth-child(2)')
        await page.click('#wrap_gnb > div.wrap_gnb > dl:nth-child(4) > dd:nth-child(2) > a:nth-child(2)')
        await page.waitForSelector('#wrap_gnb > div.wrap_gnb > dl:nth-child(4) > dd:nth-child(2) > a:nth-child(2)')
        
        const content = await page.content();
        const $ = cheerio.load(content)
        const $bodyList = $("table#post_list tbody").find('tr[id^=li_]');

        let ulList = [];
        
        $bodyList.each((i, item) => {
            ulList[i] = {
              site: `웃대`,
              title: getTitle($(item).find('td.li_sbj a').text(), $(item).find('td.li_sbj a span.list_comment_num').text()),
              comment: $(item).find('td.li_sbj a span.list_comment_num').text().trim(),
              url: `http://web.humoruniv.com/board/humor/${$(item).find('td.li_sbj a').attr('href')}`,
              author: $(item).find('td.g6').text(),
              date: $(item).find('span.w_date').text().trim(),
              view: getView($(item).find('td.li_und').text()),
              like: $(item).find('span.o').text().trim()
            }
            inputData(ulList[i])
        })
        await page.close();
        await browser.close();
        
        return ulList

    }catch(e){
        console.log(e)
    }
}

func()

const getTitle = (val, comment) => {
    const ret = val.trim().split(comment)[0].trim()
    return ret
}

const getView = (val) => {
    const ret = val.trim().split('\t')[0].split('\n')[0]
    return ret
}

module.exports.getData2 = func;