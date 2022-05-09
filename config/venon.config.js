const path = require("path");
const open = require('open');

module.exports = {
  catchQR: (base64Qr, asciiQR) => {
    const matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    if (matches.length !== 3) return new Error('Erro ao criar QRcode');

    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');

    const imageBuffer = response;
    require('fs').writeFile('qrcode.png', imageBuffer['data'], 'binary', async (err) => {
      if (err != null) console.log(err);
      const pathFile = path.resolve('qrcode.png');
      await open('file:///' + pathFile);
    }
    );
  },
  folderNameToken: 'sessions_whatsapp',
  session: 'upload_data',
  multidevice: true,
  disableWelcome: true,
  logQR: false,
  headless: true,
}