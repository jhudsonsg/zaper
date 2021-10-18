const NewBrowser = require('./NewBrowser');
const { processoDownload } = require('./util/logger');
const { GROUPS_PEOPLES, VERIFY_DOWNLOAD } = require('../config');
const TIME_WAIT = 3000;
let finesh = 0;
let _finesh = 0;

const watchDownloadProcesses = async (page) => {
  processoDownload.log('info', `Começando download do arquivo ${++_finesh}.`);

  let verify = setInterval(async () => {
    console.log(`Baixando seus arquivos, aguarde...`)
    const contentElement = await page.$eval('.toastContents > .toastTitle', el => el.textContent)
    if (contentElement == VERIFY_DOWNLOAD) {
      finesh++;
      clearInterval(verify);
      await page.close();

      processoDownload.log('info', `Finalizando download do arquivo ${finesh}.`);
    }
  }, TIME_WAIT);
}

const watchDownloadProcessesFinal = async (browser) => {
  let verify = setInterval(async () => {
    if (finesh == GROUPS_PEOPLES.length) {
      await browser.close();
      clearInterval(verify);

      processoDownload.log('info', 'Finalizado todos os downloads.');
      processoDownload.log('info', 'Processo finalizado.');
    }
  }, TIME_WAIT);
}

(async () => {
  const browser = await NewBrowser();

  processoDownload.log('info', 'Iniciando processo.');

  for ([agente, file, link] of GROUPS_PEOPLES) {
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto(link, {
      waitUntil: ['load', 'domcontentloaded']
    });

    await page.waitForSelector('#exportMenuBtn', { visible: true })
    await page.$eval('#exportMenuBtn', btn => btn.click());

    await page.waitForSelector('.mat-menu-content > button:nth-child(3)', { visible: true })
    await page.$eval('.mat-menu-content > button:nth-child(3)', btn => btn.click());

    await page.waitForSelector('.templateActions > button', { visible: true })
    await page.$eval('.templateActions > button', btn => btn.click());

    await page.waitForSelector('.toastContents > .toastTitle', { visible: true })
    await page.waitFor(2000)

    await watchDownloadProcesses(page);
  }

  await watchDownloadProcessesFinal(browser);
})();