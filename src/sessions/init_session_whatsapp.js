const { STRATEGY } = require('../../config');

const sessions = {
  venombot: require('./venombot/init_session_whatsapp_venom'),
  whatsappwebjs: require('./venombot/init_session_whatsapp_whatsappjs'),
}

sessions[STRATEGY]();