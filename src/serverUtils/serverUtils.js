// Classes
const File = require('./.classes/file.js');
const ClientFile = require('./.classes/clientFile.js');
const Server = require('./.classes/server.js');

// JSON
const MIMETYPES = require('./.jsons/mimeTypes.json');
const EXTENSIONTOMIME = require('./.jsons/extensionToMime.json');

// Utils
const fileReader = require('./.utils/fileReader.js');
const mimeParser = require('./.utils/mimeParser.js');
const responseMaker = require('./.utils/responseMaker.js');
const requestParser = require('./.utils/requestParser.js');
const respond = require('./.utils/respond.js');

module.exports = {
  // Classes
  File,
  ClientFile,
  Server,
  // JSON
  MIMETYPES,
  EXTENSIONTOMIME,
  // Utils
  // Spread all util methods straight to serverUtils
  ...fileReader,
  ...mimeParser,
  ...responseMaker,
  ...requestParser,
  ...respond,
};
