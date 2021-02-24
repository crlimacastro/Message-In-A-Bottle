const fsExtension = require('./.utilsAutomation/fsExtension.js');
const exportsLoader = require('./.utilsAutomation/exportsLoader.js');

const classPath = `${__dirname}/.fileUtils/classes/`;
const classes = exportsLoader.getExportsRecursive(classPath);
const { ClientFile } = classes;

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

/** Returns all files(not directories) in a specified directory only */
const getFiles = (dirPath) => {
  // If path is a directory
  if (fsExtension.isDirectory(dirPath)) {
    const filepaths = fsExtension.getFilepaths(dirPath);
    // Get array of files of each path
    const files = filepaths.map((filepath) => new ClientFile(filepath));

    return files;
  }

  throw new TypeError('dirPath is not a path to a directory.');
};

/** Returns array of files in a directory and all subdirectories */
const getFilesRecursive = (dirPath) => {
  // If path is a directory
  if (fsExtension.isDirectory(dirPath)) {
    const filepaths = fsExtension.getFilepathsRecursive(dirPath);

    // Get array of files of each path
    const files = filepaths.map((filepath) => new ClientFile(filepath));

    return files;
  }

  throw new TypeError('dirPath is not a path to a directory.');
};

module.exports = {
  ...classes,
  ...fsExtension,
  ...exportsLoader,
  getBinarySize,
  getFiles,
  getFilesRecursive,
};
