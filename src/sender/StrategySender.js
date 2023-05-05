const Whatsappwebjs = require("./senders/Whatsappwebjs");
const Venombot = require("./senders/venombot");

module.exports = strategy => {
  const strategies = {
    whatsappwebjs: new Whatsappwebjs(),
    venombot: new Venombot()
  }

  return strategies[strategy];
}