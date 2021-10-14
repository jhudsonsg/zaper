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

  /**********************************************************************************************************
  * 
  * Configuração do Chrome.
  * 
  \***********************************************************************************************************/
  PATH_CHROME_INTERNAL: process.env.PATH_CHROME_INTERNAL,
  PATH_CHROME_CHACE: './puppeteer_data',

  /**********************************************************************************************************
   * 
   * Nome dos grupos ou pessoas a serem notificados com os arquivos com seus arquivos e links.
   * Exemplo: 
   *          ['Nome do grupo', 'Nome do aquivo', 'Link']
   * 
  \***********************************************************************************************************/
  GROUPS_PEOPLES: [
    ['TESTE GRUPO 1', 'TESTE GRUPO 1.pdf', 'https://app.powerbi.com/groups/77ff3217-ae8b-4332-8a70-cd1000b9ed1e/reports/f568ff3c-dbe3-463d-ab29-f9ed289b9576/ReportSectionb7249299066fe8d82b8a'],
    ['TESTE GRUPO 2', 'TESTE GRUPO 2.pdf', 'https://app.powerbi.com/groups/77ff3217-ae8b-4332-8a70-cd1000b9ed1e/reports/86f093f6-3f4c-4bcf-97d3-cfc01a2567f9/ReportSection1153bbfc1f779b491975'],
  ],
}