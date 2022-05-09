const venom = require('venom-bot');
const { NAME_FILE_GROUPS_PEOPLES, PATH_DOWNLOAD_FILES, TIME_SEND_FILE } = require('../config');
const venomConfig = require('../config/venon.config.js');

const { getGroupPeoples, pause, getFormatTo } = require('./util/helpers');
const { processoUpload } = require('./util/logger');
const { deleteFile } = require('./util/file');

const groupsPeoples = getGroupPeoples(NAME_FILE_GROUPS_PEOPLES);

const sendMessage = (client, to) => {
  return new Promise(async (res, rej) => {
    await client.sendText(getFormatTo(to), 'Mensagem enviada com sucesso.')
      .then((result) => {
        if (result.status = 'ok') res(`Mensagem enviada para ${to}`);
        else res(result)
      })
      .catch((erro) => {
        res(`Problema o enviar mensagem para ${to}`);
        console.error(erro);
      });
  })
}

const sendFile = (client, to, fileName) => {
  return new Promise(async (res, rej) => {
    await client
      .sendFile(
        getFormatTo(to),
        `${PATH_DOWNLOAD_FILES}${fileName}`,
        fileName,
        fileName
      )
      .then((result) => {
        if (result.status = 'ok') res(`Arquivo enviada para ${to}`);
        else res(result)
      })
      .catch((erro) => {
        res(`Problema o enviar arquivo para ${to}`);
        console.error(erro);
      });
  })
}

const run = async () => {
  const client = await venom.create(venomConfig)

  client.onStateChange(async (state) => {
    if ('CONFLICT'.includes(state)) client.useHere();

    if ('UNPAIRED'.includes(state)) console.log('logout');

    if ('OPENING'.includes(state)) {
      processoUpload.log('status', 'Excluindo sessões');
      console.log('Excluindo sessões. ', token_path)
      processoUpload.log('status', 'Reabrindo sessão');
      console.log('Reabrindo sessões.');
      await venom.create(venomConfig);
    }
  });

  for (let i = 0; i < groupsPeoples.length; i++) {
    const [to, fileName, _] = groupsPeoples[i];
    const resultMessage = await sendMessage(client, to)
    processoUpload.log('status', resultMessage);
    console.log(resultMessage);

    const resultFile = await sendFile(client, to, fileName)
    processoUpload.log('status', resultFile);
    console.log(resultFile);

    await deleteFile(`${PATH_DOWNLOAD_FILES}${fileName}`, fileName);
    await pause(TIME_SEND_FILE);
  }

  process.exit()
}

run()