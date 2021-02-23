// JSON
const MIMETYPES = require('../.jsons/mimeTypes.json');
const EXTENSIONTOMIME = require('../.jsons/extensionToMime.json');

/**
 * Helper function, extracts file name out of full path.
 * Returns null if not found */
const getFileName = (filepath) => {
    let i = filepath.lastIndexOf('/');
    let j = filepath.lastIndexOf('\\');
    let index = Math.max(i, j);
    return index === -1 ? null : filepath.substring(index + 1);
};

const getFileExtension = (filename) => {
    return filename.substring(filename.lastIndexOf('.') + 1);
};

const getExtension = (filepath) => getFileExtension(getFileName(filepath));
const getType = (filepath) => MIMETYPES[EXTENSIONTOMIME[getExtension(filepath)]];

module.exports = {
    getExtension,
    getType,
};