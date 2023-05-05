const { STRATEGY } = require('../../config');

const sessions = {
  venombot: require('./strategysSession/init_session_whatsapp_venom'),
  whatsappwebjs: require('./strategysSession/init_session_whatsapp_whatsappjs'),
}

sessions[STRATEGY]();