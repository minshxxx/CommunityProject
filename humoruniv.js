const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

const getData2 = async() => {
    try{
        const broswer = await puppeteer.launch({ 
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await broswer.newPage();

        page.on("dialog", (dialog) => {
            dialog.accept();
        })
        await page.goto('http://web.humoruniv.com/board/humor/list.html?table=pds');
        await page.waitForSelector('#post_list')

        const content = await page.content();
        const $ = cheerio.load(content)
        // const $bodyList = $("table#post_list tbody").find('tr');
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
        })
        broswer.close();

        return ulList;
    }catch(e){
        console.log(e)
    }
}

const getTitle = (val, comment) => {
    const ret = val.trim().split(comment)[0]
    return ret
}

const getView = (val) => {
    const ret = val.trim().split('\t')[0].split('\n')[0]
    return ret
}

module.exports.getData2 = getData2