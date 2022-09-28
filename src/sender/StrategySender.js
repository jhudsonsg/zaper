const Whatsappwebjs = require("./senders/Whatsappwebjs");

module.exports = strategy => {
  const strategies = {
    whatsappwebjs: new Whatsappwebjs()
  }

  return strategies[strategy];
}