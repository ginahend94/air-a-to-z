const puppeteer = require('puppeteer');

const URL = 'https://www.airbnb.com/s/Los-Angeles--CA/homes';

async function start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL, {waitUntil: 'networkidle2'});
    
    // console.log(page)

    const homes = await page.$$eval('.dbldy2s.dir.dir-ltr', text => text.textContent);
    console.log(homes);

    const listings = await page.$$eval('.gh7uyir.g14v8520 .c4mnd7m', (homes) => {
        return homes.map(home => {
            return ({
                node: home,
                name: home.$eval('.t1jojoys', data => data.textContent),
                price: home.$eval('._1jo4hgw ._tyxjp1', data => data.textContent),
                totalPrice: home.$eval('._tt122m span', data => data.textContent),
                rating: home.$eval('.ru0q88m', data => data.textContent.split(' ')[0]),
            })
        })
    })

    console.log(listings)

    await browser.close();
}

start()