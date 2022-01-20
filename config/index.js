require('dotenv').config();

module.exports = {

  /**********************************************************************************************************
   * 
   * Constantes da aplicação.
   * 
  \***********************************************************************************************************/
  VERIFY_DOWNLOAD: ' O arquivo PDF está pronto para ser baixado ',
  PATH_DOWNLOAD_FILES: `${process.env.USERPROFILE}\\Downloads\\`,
  USER_POWERBI: process.env.USER_POWERBI,
  PASS_POWERBI: process.env.PASS_POWERBI,
  DOWNLOAD_QUEUE_SIZE: process.env.DOWNLOAD_QUEUE_SIZE || 5,
  DOWNLOAD_TIME_WAIT: process.env.DOWNLOAD_TIME_WAIT || 3000,
  NAME_FILE_GROUPS_PEOPLES: 'groups_peoples.txt',

  /**********************************************************************************************************
  * 
  * Configuração do Chrome.
  * 
  \***********************************************************************************************************/
  PATH_CHROME_INTERNAL: process.env.PATH_CHROME_INTERNAL,
  PATH_CHROME_CHACE: './puppeteer_data',
}