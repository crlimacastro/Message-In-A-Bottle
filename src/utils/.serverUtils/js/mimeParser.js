const fileUtils = require('../../fileUtils.js');

// JSON
const MIMETYPES = require('../json/mimeTypes.json');
const EXTENSIONTOMIME = require('../json/extensionToMime.json');

const getExtension = (filepath) => {
    const filename = fileUtils.getFileName(filepath);
    return fileUtils.getFileExtension(filename);
};

const getType = (filepath) => MIMETYPES[EXTENSIONTOMIME[getExtension(filepath)]];

module.exports = {
    getExtension,
    getType,
};