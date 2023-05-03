const fs = require('fs');
const { processoUpload } = require('./logger');

const deleteFile = (filePath, nameFile) => {
    return new Promise((res, rej) => {
        try {
            fs.unlinkSync(filePath);
            processoUpload.info(`Arquivo ${nameFile} foi deletado com sucesso.`);
        } catch (error) {
            processoUpload.error('error', `Arquivo ${nameFile} não foi deletado.`);
        }
        res();
    })
}

module.exports = { deleteFile }