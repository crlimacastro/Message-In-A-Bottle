// External modules
const fs = require('fs');
const mime = require('mime'); // https://github.com/broofa/mime

// Internal modules
const ResponseFile = require('./ResponseFile.js');

/**
 * Extracts and returns file name out of full path.
 * Returns null if not found.
 * @param {String} filepath
 * @returns {String}
 */
const getFileName = (filepath) => {
  const i = filepath.lastIndexOf('/');
  const j = filepath.lastIndexOf('\\');
  const index = Math.max(i, j);
  return index === -1 ? null : filepath.substring(index + 1);
};

class ClientFile extends ResponseFile {
  /**
     * Class for files that sit on the folder structure
     * @param {String} filepath
     */
  constructor(filepath) {
    const content = fs.readFileSync(filepath);
    const type = mime.getType(filepath);
    super(content, type);

    this.path = filepath;
    this.name = getFileName(filepath);
  }
}

module.exports = ClientFile;
