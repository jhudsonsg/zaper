const venom = require('venom-bot');
const venomConfig = require('../../config/venon.config.js');
const { processoSession } = require('../util/logger');

const run = async () => {
  processoSession.log('info', 'Iniciando sessão no Whatsapp.')
  venom.create({...venomConfig, headless: false,})
    .then(() => {
      processoSession.log('info', 'Sessão iniciada com sucesso.')
      console.log('Sessão iniciada com sucesso.')
      process.exit()
    })
    .catch((erro) => {
      console.log(erro);
    });
};

run();