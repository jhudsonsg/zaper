const fs = require('fs');

const NewBrowser = require('./NewBrowser');
const { processoUpload } = require('./util/logger');
const { GROUPS_PEOPLES, PATH_DOWNLOAD_FILES } = require('../config');


const deleteFile = (filePath, nameFile) => {
    return new Promise((resolve) => {
        fs.unlinkSync(filePath);
        processoUpload.log('info', `Arquivo ${nameFile} foi deletado com sucesso.`);
        resolve();
    })
}

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
        await page.keyboard.press('Tab');

        /* EXECUTA A BUSCA */
        await page.evaluate(async (nameAgente) => {
            let messageBox = document.querySelectorAll("[contenteditable='true']")[0];
            messageBox.innerHTML = nameAgente;
            let e = document.createEvent("UIEvents");
            e.initUIEvent("input", true, true, window, 1);
            messageBox.dispatchEvent(e);
        }, nameAgente);

        await page.waitFor(2000);

        /* CLICA NO AGENTE PESQUISADO */
        await page.evaluate(async (nameAgente) => {
            let mouseEvent = document.createEvent('MouseEvents');
            mouseEvent.initEvent('mousedown', true, true);
            document.querySelector(`[title="${nameAgente}"]`).dispatchEvent(mouseEvent);
        }, nameAgente);

        await page.waitFor(2000);
        await page.waitForSelector("[contenteditable='true']", { visible: true })

        /* ENVIA O TEXTO */
        await page.evaluate(async (nameAgente, nameFile) => {
            let e = document.createEvent("UIEvents");
            e.initUIEvent("input", true, true, window, 1);

            let messageBox = document.querySelectorAll("[contenteditable='true']")[1];
            
            while (messageBox == undefined || messageBox == null) {
                processoUpload.log('info', 'Buscando caixa de mensagem.');
                messageBox = document.querySelectorAll("[contenteditable='true']")[1];
            }

            messageBox.innerHTML = `Olá ${nameAgente}, segue o arquivo ${nameFile}.`;
            messageBox.dispatchEvent(e);
        }, nameAgente, nameFile);

        await page.waitFor(2000);

        /* ENVIA A MENSAGEM */
        await page.evaluate(async () => {
            let e = document.createEvent("MouseEvents");
            e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            document.querySelector('span[data-icon="send"]').dispatchEvent(e);
            document.querySelector('[data-testid="clip"]').click()
        });
        
        /* ENVIA O ARQUIVO */
        const elementHandle = await page.$('[data-testid="attach-document"] + input');
        await elementHandle.uploadFile(`${PATH_DOWNLOAD_FILES}${nameFile}`);
        await page.waitForSelector('[data-testid="send"]', { visible: true })
        await page.$eval('[data-testid="send"]', btn => btn.click());
        await page.waitFor(2000)

        processoUpload.log('info', `Arquivo ${nameFile} enviado ao agente ${nameAgente}.`);

        await deleteFile(`${PATH_DOWNLOAD_FILES}${nameFile}`, nameFile);
    };

    await page.waitFor(2000)
    await browser.close();

    processoUpload.log('info', 'Processo finalizado.');
})();
