// Classes
const ResponseFile = require('./classes/ResponseFile.js');
const ClientFile = require('./classes/ClientFile.js');

const fsExtension = require('./js/fsExtension.js');
// const exportsLoader = require('./fileUtils/js/exportsLoader.js');

module.exports = {
  ResponseFile,
  ClientFile,
  ...fsExtension,
  // ...exportsLoader,
};
