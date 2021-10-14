const { createLogger, format, transports } = require('winston');

const configDefault = {
  format: format.combine(
    format.timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
    format.printf(e => `[${e.timestamp}] [${e.level}]: ${e.message}`)
  )
}

const date = new Date();
const date_now = (date.getFullYear() + "-" + ((date.getMonth() + 1)) + "-" + (date.getDate() )) ;                 

const processoUpload = createLogger({
  ...configDefault,
  transports: [
    new transports.File({ filename: `./logs/${date_now}/process-upload.log`}),
  ],
});

const processoDownload = createLogger({
  ...configDefault,
  transports: [
    new transports.File({ filename: `./logs/${date_now}/process-download.log`}),
  ],
});

const processoSession = createLogger({
  ...configDefault,
  transports: [
    new transports.File({ filename: `./logs/${date_now}/process-session.log`}),
  ],
});

module.exports = { processoUpload, processoDownload, processoSession }