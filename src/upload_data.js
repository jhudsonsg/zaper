const { GROUPS_PEOPLES, PATH_DOWNLOAD_FILES } = require('../config');

const { processoUpload } = require('./util/logger');
const { deleteFile } = require('./util/file');

const NewBrowser = require('./NewBrowser');

(async () => {
  const browser = await NewBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  await page.goto('https://web.whatsapp.com/', {
    waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']
  });

  await page.waitFor(2000)
  await page.waitForSelector('[contenteditable="true"]', { visible: true })

  processoUpload.log('info', 'Iniciando processo.');

  for (agent of GROUPS_PEOPLES) {
    const [nameAgente, nameFile] = agent;

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto('https://web.whatsapp.com/', { waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'] });

    await page.waitForSelector('[contenteditable="true"]', { visible: true })
    await page.waitFor(5000);
    await page.keyboard.press('Tab');

    /* EXECUTA A BUSCA */
    try {
      await page.evaluate(async (nameAgente) => {
        let e = document.createEvent("UIEvents");
        e.initUIEvent("input", true, true, window, 1);

        let searchAgent = document.querySelectorAll("[contenteditable='true']")[0];
        searchAgent.innerHTML = nameAgente;
        searchAgent.dispatchEvent(e);
      }, nameAgente);
    } catch (error) {
      console.log(`Não foi possivel realizar a busca ao agente ${nameAgente}.`);
      processoUpload.log('error', `Não foi possivel realizar a busca ao agente ${nameAgente}.`);
      processoUpload.log('error', error.message);
    }

    /* ENTRA NA CONVERSA DO AGENTE PESQUISADO */
    try {
      await page.waitFor(3000);
      await page.keyboard.press('Enter');
    } catch (error) {
      console.log(`Não foi possivel clicar no agente ${nameAgente}.`);
      processoUpload.log('error', `Não foi possivel clicar no agente ${nameAgente}.`);
      processoUpload.log('error', error.message);
    }

    await page.waitForSelector('[data-testid="clip"]', { visible: true })

    try {
      /* ENVIA O TEXTO */
      await page.evaluate(async (nameAgente, nameFile) => {
        let e = document.createEvent("UIEvents");
        e.initUIEvent("input", true, true, window, 1);

        let messageBox = document.querySelectorAll("[contenteditable='true']")[1];
        messageBox.innerHTML = `Olá ${nameAgente}, segue o arquivo ${nameFile}.`;
        messageBox.dispatchEvent(e);

      }, nameAgente, nameFile);
    } catch (error) {
      console.log(`Não foi possivel selecionar a caixa de texto do agente ${nameAgente}.`);
      processoUpload.log('error', `Não foi possivel selecionar a caixa de texto do agente ${nameAgente}.`);
      processoUpload.log('error', error.message);
    }

    try {
      /* ENVIA A MENSAGEM */
      await page.evaluate(async () => {
        let e = document.createEvent("MouseEvents");
        e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        document.querySelector('span[data-icon="send"]').dispatchEvent(e);

        const clipSend = document.querySelector('[data-testid="clip"]')

        if (clipSend) clipSend.click()
      });
    } catch (error) {
      console.log(`Não foi possivel clicar para enviar sua mensagem ao agente ${nameAgente}.`);
      processoUpload.log('error', `Não foi possivel clicar para enviar sua mensagem ao agente ${nameAgente}.`);
      processoUpload.log('error', error.message);
    }

    /* ENVIA O ARQUIVO */
    try {
      const elementHandle = await page.$('[data-testid="attach-document"] + input');
      await elementHandle.uploadFile(`${PATH_DOWNLOAD_FILES}${nameFile}`);
      await page.waitForSelector('[data-testid="send"]', { visible: true })
      await page.$eval('[data-testid="send"]', btn => btn.click());
      await page.waitFor(2000)
    } catch (error) {
      console.log(`Não foi possivel envia o arquivo ao agente ${nameAgente}.`);
      processoUpload.log('error', `Não foi possivel envia o arquivo ao agente ${nameAgente}.`);
      processoUpload.log('error', error.message);
    }

    processoUpload.log('info', `Processo da tentativa de envio do arquivo ${nameFile} ao agente ${nameAgente} finalizado.`);

    await page.waitFor(5000)
    await page.close();
    await deleteFile(`${PATH_DOWNLOAD_FILES}${nameFile}`, nameFile);
  };

  await browser.close();

  processoUpload.log('info', 'Processo finalizado.');
})();
