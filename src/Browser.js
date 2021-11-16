const puppeteer = require('puppeteer');
const { PATH_CHROME_INTERNAL, PATH_CHROME_CHACE } = require('../config');

const Browser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: PATH_CHROME_CHACE,
    executablePath: PATH_CHROME_INTERNAL,
    args: [
      '--start-maximized',
      `--user-data-dir=${PATH_CHROME_CHACE}`
    ],
  });

  return browser;
}

module.exports = Browser;