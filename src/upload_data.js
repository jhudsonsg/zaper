const { STRATEGY } = require('../config');

const strategySender = require('./sender/StrategySender');
const sender = strategySender(STRATEGY);
sender.upload();