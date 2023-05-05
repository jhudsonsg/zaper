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

  TIME_SEND_FILE: process.env.TIME_SEND_FILE || 3000,
  STRATEGY: process.env.STRATEGY || 'venombot'
}