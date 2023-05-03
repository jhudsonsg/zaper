const Browser = require('./Browser');
const { NAME_FILE_GROUPS_PEOPLES, GROUPS_PEOPLES, VERIFY_DOWNLOAD, DOWNLOAD_QUEUE_SIZE, DOWNLOAD_TIME_WAIT } = require('../config');
const { processoDownload } = require('./util/logger');
const { getGroupPeoples } = require('./util/helpers');

let browser,
  totalDownloads = 0;
  currentTotalDownloads = 0;

const watchDownloadCompletion = (page, fileName) => {
  processoDownload.info(`Começando download do arquivo ${fileName}.`);

  let verify = setInterval(async () => {
    console.log(`Baixando seu arquivo ${fileName}, aguarde...`)
    const contentElement = await page.$eval('.toastContents > .toastTitle', el => el.textContent)
    if (contentElement == VERIFY_DOWNLOAD) {
      currentTotalDownloads++;
      console.log(`Finalizando download do arquivo ${fileName}.`)
      processoDownload.info(`Finalizando download do arquivo ${fileName}.`);
      page.close();
      clearInterval(verify);
    }
  }, DOWNLOAD_TIME_WAIT);
}

const execProcessDownload = groupPeoples => {
  return new Promise(async (res, rej) => {
    for (let i = 0; i < groupPeoples.length; i++) {
      const [_, fileName, link] = groupPeoples[i]

      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.setViewport({ width: 1200, height: 800 });
      await page.goto(link, { waitUntil: ['load', 'domcontentloaded'] });

      await page.waitForSelector('#exportMenuBtn', { visible: true })
      await page.$eval('#exportMenuBtn', btn => btn.click());

      await page.waitForSelector('.mat-menu-content > button:nth-child(3)', { visible: true })
      await page.$eval('.mat-menu-content > button:nth-child(3)', btn => btn.click());

      await page.waitForSelector('.templateActions > button', { visible: true })
      await page.$eval('.templateActions > button', btn => btn.click());

      await page.waitForSelector('.toastContents > .toastTitle', { visible: true })

      watchDownloadCompletion(page, fileName)
    }

    let verify = setInterval(() => {
      console.log(`Verificando processo da fila de ${DOWNLOAD_QUEUE_SIZE} downloads.`);
      if (currentTotalDownloads == totalDownloads) {
        currentTotalDownloads = 0;
        res();
        clearInterval(verify);
      }
    }, DOWNLOAD_TIME_WAIT);
  })
}

const run = async () => {
  processoDownload.info('Iniciando processo de download.');
  const groupsPeoples = getGroupPeoples(NAME_FILE_GROUPS_PEOPLES);
  browser = await Browser();
  
  while (groupsPeoples.length > 0) {
    const groupPeoplesSlice = groupsPeoples.splice(0, DOWNLOAD_QUEUE_SIZE);
    totalDownloads = groupPeoplesSlice.length;
    await execProcessDownload(groupPeoplesSlice);
  }

  await browser.close();
  processoDownload.info('Processo finalizado.');
};

run()