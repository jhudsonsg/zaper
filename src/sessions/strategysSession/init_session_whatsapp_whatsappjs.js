const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { processoSession } = require('../../util/logger');

module.exports = function initSession() {
  processoSession.info('Iniciando sessão no Whatsapp.')

  const client = new Client({
    authStrategy: new LocalAuth({ clientId: "Zaper" }),
    puppeteer: { headless: true }
  });

  client.initialize();

  client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
  });

  client.on('authenticated', () => {
    console.clear();
    console.log('***************************************************************************************');
    console.log('Sessão iniciada com sucesso.');
    console.log('***************************************************************************************');
    processoSession.info('Sessão iniciada com sucesso.')
  });

  client.on('auth_failure', msg => {
    console.log('Sessão com problemas.', msg)
    processoSession.info('Sessão com problemas.')
  });

  client.on('ready', () => {
    console.info('Caso não apareça o QRCODE você já pode fechar o processo com Ctrl+C.');
    console.error('Aguarde sair do status "Sincronizando" para "Ativo" para finalizar.');
    console.log('***************************************************************************************');
    process.exit();
  });

}