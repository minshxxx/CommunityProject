const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const db = require('./../database')

module.exports.getData = async() => {
    try{
        const browser = await puppeteer.launch({
            "headless": true,
        })
        const page = await browser.newPage();

        await page.goto(`http://web.humoruniv.com/`, { waitUntil: ['load', 'networkidle0'] }); // WAIT for the page load finish. Provide wait options, you can read moe about it in documentation.
        await page.waitForSelector('#wrap_gnb > div.wrap_gnb > dl:nth-child(4) > dd:nth-child(2) > a:nth-child(2)')
        await page.click('#wrap_gnb > div.wrap_gnb > dl:nth-child(4) > dd:nth-child(2) > a:nth-child(2)')
        await page.waitForSelector('#post_list > tbody > tr:nth-child(19)')
        
        let content = await page.content();
        let $ = cheerio.load(content)
        let $bodyList = $("#post_list > tbody").find('tr[id^=li_chk_pds-]');

        let ulList = [];
        
        $bodyList.each((i, item) => {
            ulList.push({
              site: `웃대`,
              subject: getTitle($(item).find('td.li_sbj a').text(), $(item).find('td.li_sbj a span.list_comment_num').text()),
              comment: $(item).find('td.li_sbj a span.list_comment_num').text().trim(),
              url: `http://web.humoruniv.com/board/humor/${$(item).find('td.li_sbj a').attr('href')}`,
              author: $(item).find('td.g6').text(),
              date: $(item).find('span.w_date').text().trim() + ' ' + $(item).find('span.w_time').text().trim(),
              view: getView($(item).find('td.li_und').text()),
              like: $(item).find('span.o').text().trim()
            })
        })
        
        await page.click('#cnts_list_new > div.paging > span > a:nth-child(3)')
        await page.waitForSelector('#post_list > tbody > tr:nth-child(19)')
        
        content = await page.content();
        $ = cheerio.load(content)
        $bodyList = $("#post_list > tbody").find('tr[id^=li_chk_pds-]');
        
        $bodyList.each((i, item) => {
            ulList.push({
              site: `웃대`,
              subject: getTitle($(item).find('td.li_sbj a').text(), $(item).find('td.li_sbj a span.list_comment_num').text()),
              comment: $(item).find('td.li_sbj a span.list_comment_num').text().trim(),
              url: `http://web.humoruniv.com/board/humor/${$(item).find('td.li_sbj a').attr('href')}`,
              author: $(item).find('td.g6').text(),
              date: $(item).find('span.w_date').text().trim() + ' ' + $(item).find('span.w_time').text().trim(),
              view: getView($(item).find('td.li_und').text()),
              like: $(item).find('span.o').text().trim()
            })
        })

        ulList.forEach((item) => {
            db.inputData(item)
        })

        await page.close();
        await browser.close();

        return ulList;
        
    }catch(e){
        console.log(e)
    }
}

const getTitle = (val, comment) => {
    const ret = val.trim().split(comment)[0].trim()
    return ret
}

const getView = (val) => {
    const ret = val.trim().split('\t')[0].split('\n')[0]
    return ret
}