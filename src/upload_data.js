const { NAME_FILE_GROUPS_PEOPLES, PATH_DOWNLOAD_FILES, TIME_SEND_FILE } = require('../config');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const { getGroupPeoples, pause, getFormatTo } = require('./util/helpers');
const { processoUpload } = require('./util/logger');
const { deleteFile } = require('./util/file');

const groupsPeoples = getGroupPeoples(NAME_FILE_GROUPS_PEOPLES);

const sendMessage = (client, to, type) => {
  return new Promise(async (res, rej) => {
    try {
      await client.sendMessage(getFormatTo(to, type), 'Enviando Acompanhamento de vendas.');
      res(`Mensagem enviada para ${to}`)
    } catch (error) {
      res(`Problema o enviar mensagem para ${to}`);
    }
  })
}

const sendFile = (client, to, fileName, type) => {
  return new Promise(async (res, rej) => {
    try {
      const media = MessageMedia.fromFilePath(`${PATH_DOWNLOAD_FILES}${fileName}`);
      await client.sendMessage(getFormatTo(to, type), media);
      res(`Arquivo enviado para ${to}`)
    } catch (error) {
      console.error(erro);
      res(`Problema o enviar arquivo para ${to}`);
    }
  })
}

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
  processoUpload.log('status', 'Sessão com problemas.');
  process.exit();
});

client.on('ready', async () => {
  console.log('Iniciando envio');
  processoUpload.log('status', 'Iniciando envio de mensagens');
  console.log('--------------------------------------------------------------');

  for (let i = 0; i < groupsPeoples.length; i++) {
    const [to, fileName, _, type] = groupsPeoples[i];
    const resultMessage = await sendMessage(client, to, type)
    processoUpload.log('status', resultMessage);
    console.log(resultMessage);

    const resultFile = await sendFile(client, to, fileName, type)
    processoUpload.log('status', resultFile);
    console.log(resultFile);

    console.log('--------------------------------------------------------------');

    await deleteFile(`${PATH_DOWNLOAD_FILES}${fileName}`, fileName);
    await pause(TIME_SEND_FILE);
  }

  setTimeout(() => {
    console.log('Finalizando envio');
    processoUpload.log('status', 'Finalizando envio');
    process.exit()
  }, 5000);
});

client.initialize();