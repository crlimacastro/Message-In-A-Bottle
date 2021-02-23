// JSON
const MIMETypes = require('./.jsons/mimetypes.json');
const extensionToMIME = require('./.jsons/extensionToMIME.json');

// Utils
const dirReader = require('./.utils/dirReader.js');
const fileResponseMaker = require('./.utils/fileResponseMaker.js');
const requestParser = require('./.utils/requestParser.js');
const responseHandler = require('./.utils/responseHandler.js');

module.exports = {
  MIMETypes,
  extensionToMIME,
  // Spread all util methods to serverUtils
  ...dirReader,
  ...fileResponseMaker,
  ...requestParser,
  ...responseHandler,
};
