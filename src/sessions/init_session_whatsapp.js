const Browser = require('../Browser');
const { processoSession } = require('../util/logger');

(async () => {
    processoSession.log('info', 'Iniciando sessão no Whatsapp.')
    const browser = await Browser();

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto('https://web.whatsapp.com/', {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']
    });
    
    processoSession.log('info', 'Sessão iniciada com sucesso.')
})();