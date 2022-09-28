const InterfaceSender = require('../interface/InterfaceSender');
const { MessageMedia } = require('whatsapp-web.js');
const { getFormatTo } = require('../../util/helpers');
const { PATH_DOWNLOAD_FILES } = require('../../../config');

module.exports = class Whatsappwebjs extends InterfaceSender {
  sendMessage(client, to, type) {
    return new Promise(async (res) => {
      try {
        await client.sendMessage(getFormatTo(to, type), 'Enviando Acompanhamento de vendas.');
        res(`Mensagem enviada para ${to}`)
      } catch (error) {
        console.error(error);
        res(`Problema o enviar mensagem para ${to}`);
      }
    })
  };

  sendFile(client, to, fileName, type) {
    return new Promise(async (res) => {
      try {
        const media = MessageMedia.fromFilePath(`${PATH_DOWNLOAD_FILES}${fileName}`);
        await client.sendMessage(getFormatTo(to, type), media);
        res(`Arquivo enviado para ${to}`)
      } catch (error) {
        console.error(error);
        res(`Problema o enviar arquivo para ${to}`);
      }
    })
  };
}