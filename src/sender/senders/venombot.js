const venom = require('venom-bot');
const fs = require('fs');
const InterfaceSender = require('../interface/InterfaceSender');
const { NAME_FILE_GROUPS_PEOPLES, PATH_DOWNLOAD_FILES, TIME_SEND_FILE } = require('../../../config');

const { getFormatTo, getGroupPeoples, pause } = require('../../util/helpers');
const { processoUpload } = require('../../util/logger');
const { deleteFile } = require('../../util/file');

module.exports = class Venombot extends InterfaceSender {
  upload() {
    const TOKEN_DIR = "./data/app/tokens";
    const TOKEN_PATH = TOKEN_DIR + "/wa-session.data.json";
    let browserSessionToken = null;
    if (fs.existsSync(TOKEN_PATH)) {
      const savedTokenString = fs.readFileSync(TOKEN_PATH).toString();
      browserSessionToken = JSON.parse(savedTokenString);
    }

    venom
      .create({
        session: 'zaper',
        folderNameToken: 'tokens',
        mkdirFolderToken: './data/app',
        createPathFileToken: true,
        browserSessionToken: browserSessionToken,
        disableWelcome: true,
      })
      .then(async (client) => {
        const token = await client.getSessionTokenBrowser();
        await fs.promises.mkdir(TOKEN_DIR, { recursive: true });
        await fs.promises.writeFile(TOKEN_PATH, JSON.stringify(token));
        await this.send(client)
      })
      .catch((erro) => {
        console.log(erro);
      });
      
  }

  async send(client) {
    const groupsPeoples = getGroupPeoples(NAME_FILE_GROUPS_PEOPLES);
    console.log('Iniciando envio');
    processoUpload.info('Iniciando envio de mensagens');
    console.log('--------------------------------------------------------------');

    for (let i = 0; i < groupsPeoples.length; i++) {
      const [to, fileName, _, type] = groupsPeoples[i];

      const resultFile = await this.sendFile(client, to, fileName, type, 'Enviando Acompanhamento de vendas.')
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
  }

  sendMessage(client, to, type, message) {
    return new Promise(async (res) => {
      try {
        client.sendText(getFormatTo(to, type), message)
        res(`Mensagem enviada para ${to}`)
      } catch (error) {
        console.error(error);
        res(`Problema o enviar mensagem para ${to}`);
      }
    })
  };

  sendFile(client, to, fileName, type, message) {
    return new Promise(async (res) => {
      try {
        await client
          .sendFile(
            getFormatTo(to, type),
            `${PATH_DOWNLOAD_FILES}${fileName}`,
            fileName,
            message
          )
        res(`Arquivo enviado para ${to}`)
      } catch (error) {
        console.error(error);
        res(`Problema o enviar arquivo para ${to}`);
      }
    })
  };
}