const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const { NAME_FILE_GROUPS_PEOPLES, PATH_DOWNLOAD_FILES, TIME_SEND_FILE } = require('../config');

const { getGroupPeoples, pause } = require('./util/helpers');
const { processoUpload } = require('./util/logger');
const { deleteFile } = require('./util/file');

const strategySender = require('./sender/StrategySender');

const groupsPeoples = getGroupPeoples(NAME_FILE_GROUPS_PEOPLES);
const sender = strategySender('whatsappwebjs');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true }
});

client.on('qr', qr => {
  console.clear();
  console.log('*************************************************************************************************');
  console.log('AUTENTICAÇÃO É NECESSÁRIA PARA O ENVIO DAS MENSAGENS');
  console.log('*************************************************************************************************');
  qrcode.generate(qr, { small: true });
  console.log('*************************************************************************************************');
});

client.on('authenticated', () => {
  console.clear();
  console.log('Sessão já iniciada.');
});

client.on('auth_failure', msg => {
  console.error('Sessão com problemas.', msg);
  processoUpload.info('Sessão com problemas.');
  process.exit();
});

client.on('ready', async () => {
  console.log('Iniciando envio');
  processoUpload.info('Iniciando envio de mensagens');
  console.log('--------------------------------------------------------------');

  for (let i = 0; i < groupsPeoples.length; i++) {
    const [to, fileName, _, type] = groupsPeoples[i];

    const resultMessage = await sender.sendMessage(client, to, type)
    processoUpload.info(resultMessage);
    console.log(resultMessage);

    const resultFile = await sender.sendFile(client, to, fileName, type)
    processoUpload.info(resultFile);
    console.log(resultFile);

    console.log('--------------------------------------------------------------');

    //await deleteFile(`${PATH_DOWNLOAD_FILES}${fileName}`, fileName);
    await pause(TIME_SEND_FILE);
  }

  setTimeout(() => {
    console.log('Finalizando envio');
    processoUpload.info('Finalizando envio');
    process.exit()
  }, 5000);
});

client.initialize();