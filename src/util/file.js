const fs = require('fs');

const deleteFile = (filePath, nameFile) => {
    return new Promise((resolve) => {
        fs.unlinkSync(filePath);
        processoUpload.log('info', `Arquivo ${nameFile} foi deletado com sucesso.`);
        resolve();
    })
}

module.exports = { deleteFile }