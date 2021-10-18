const { Command } = require('commander');
const program = new Command();

program
  .option('--session <program>', 'Iniciar sessão nas redes das opções: powerbi | whatsapp')
  .option('--data <action>', 'Baixa ou envia os dados, opções: download | upload')

program.parse(process.argv);
const options = program.opts();

if (options.session) {
  if (options.session == 'powerbi')
    console.log('powerbi');

  if (options.session == 'whatsapp')
    console.log('whatsapp');
}

if (options.data) {
  if (options.data == 'download')
    console.log('download');

  if (options.data == 'upload')
    console.log('upload');
}