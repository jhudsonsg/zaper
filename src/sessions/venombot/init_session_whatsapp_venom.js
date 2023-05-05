const venom = require('venom-bot');
const fs = require('fs');
const { processoSession } = require('../../util/logger');

module.exports = function initSession() {
  processoSession.info('Iniciando sessão no Whatsapp.')

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
    .then( () => {
      console.log('***************************************************************************************');
      console.log('Sessão iniciada com sucesso.');
      console.log('***************************************************************************************');
      processoSession.info('Sessão iniciada com sucesso.')
      process.exit(1);
    })
    .catch((erro) => {
      console.log(erro);
    });
}