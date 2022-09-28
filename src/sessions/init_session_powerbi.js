const Browser = require('../Browser');
const { processoSession } = require('../util/logger');
const { USER_POWERBI, PASS_POWERBI } = require('../../config');

(async () => {
    processoSession.log('info', 'Iniciando sessão no PowerBi.')
    const browser = await Browser();

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto('https://app.powerbi.com/', {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']
    });
    await page.type('[name="loginfmt"]', USER_POWERBI)
    await page.$eval('#idSIButton9', btn => btn.click());
    await page.type('[name="passwd"]', PASS_POWERBI)

    await page.waitFor(3000)
    await page.$eval('#idSIButton9', btn => btn.click());
    await page.waitFor(3000)
    await page.$eval('#idSIButton9', btn => btn.click());
    await page.waitFor(3000)

    await browser.close();

    processoSession.log('info', 'Sessão iniciada com sucesso.')
})();