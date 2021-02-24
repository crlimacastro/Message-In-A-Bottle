const fsExtension = require('./.utilsAutomation/fsExtension.js');
const exportsLoader = require('./.utilsAutomation/exportsLoader.js');

const classDirPath = `${__dirname}/.fileUtils/classes/`;
const classes = exportsLoader.getExportsRecursive(classDirPath);
const { ClientFile } = classes;

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
  ...fsExtension,
  ...exportsLoader,
  ...classes,
  getFiles,
  getFilesRecursive,
};
