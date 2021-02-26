// JSON
const EXTENSIONTOMIME = require('./mimeparser/json/EXTENSIONTOMIME.json');
const MIMETYPES = require('./mimeparser/json/MIMETYPES.json');

/** Converts file extension to MIME type */
const getType = (fileExtension) => MIMETYPES[EXTENSIONTOMIME[fileExtension]];

module.exports = {
  EXTENSIONTOMIME,
  MIMETYPES,
  getType,
};
