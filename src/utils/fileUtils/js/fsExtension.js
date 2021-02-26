/** Contains helper functions to work with filepaths and directories */

// External modules
const fs = require('fs');
const path = require('path');

// Internal modules
const ClientFile = require('../classes/ClientFile.js');

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

/**
 * Returns extension of a file from its name.
 * @param {String} filename
 * @returns {String}
 */
const getFileExtension = (filename) => {
  const i = filename.lastIndexOf('.');
  if (i !== -1) {
    return filename.substring(i + 1);
  }

  throw new Error('filename did not contain extension period (".").');
};

/** Returns path normalized and with \\ separators turned into / */
const getCleanPath = (filepath) => path.normalize(filepath).replace(/\\/g, '/');

/** Returns whether dirPath is a path to a directory */
const isDirectory = (dirPath) => fs.statSync(dirPath).isDirectory();
/** Returns whether filepath is a path to a file */
const isFile = (filepath) => fs.statSync(filepath).isFile();

/** Returns all file(not directories) paths in a specified directory */
const getFilepaths = (dirPath) => {
  // If path is a directory
  if (isDirectory(dirPath)) {
    let files = fs.readdirSync(dirPath); // Read all files in directory
    files = files.filter((file) => !isDirectory(dirPath + file)); // Remove directories from list
    const filepaths = files.map((file) => getCleanPath(path.join(dirPath, file)));
    return filepaths;
  }

  throw new TypeError('dirPath is not a path to a directory.');
};

/**
 * Returns array of paths to all files in a directory and all subdirectories
 * Second parameter not necessary for function call (used within the recursion)
 * // https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js */
const getFilepathsRecursive = (dirPath, pathsArray) => {
  // If path is a directory
  if (isDirectory(dirPath)) {
    let currentPaths = pathsArray || []; // Create empty array on first call
    const files = fs.readdirSync(dirPath); // Read all files in current directory

    files.forEach((file) => {
      if (isDirectory(dirPath + file)) {
        // Recursively call this function if one of the files is a directory
        currentPaths = getFilepathsRecursive(`${dirPath + file}/`, currentPaths);
      } else {
        // Push filepaths that are not directories into array
        currentPaths.push(getCleanPath(path.join(dirPath, file)));
      }
    });

    return currentPaths;
  }

  throw new TypeError('dirPath is not a path to a directory.');
};

/** Returns all files(not directories) in a specified directory only */
const getFiles = (dirPath) => {
  // If path is a directory
  if (isDirectory(dirPath)) {
    const filepaths = getFilepaths(dirPath);
    // Get array of files of each path
    const files = filepaths.map((filepath) => new ClientFile(filepath));

    return files;
  }

  throw new TypeError('dirPath is not a path to a directory.');
};

/** Returns array of files in a directory and all subdirectories */
const getFilesRecursive = (dirPath) => {
  // If path is a directory
  if (isDirectory(dirPath)) {
    const filepaths = getFilepathsRecursive(dirPath);

    // Get array of files of each path
    const files = filepaths.map((filepath) => new ClientFile(filepath));

    return files;
  }

  throw new TypeError('dirPath is not a path to a directory.');
};

module.exports = {
  fs,
  path,
  getFileName,
  getFileExtension,
  isDirectory,
  isFile,
  getCleanPath,
  getFilepaths,
  getFilepathsRecursive,
  getFiles,
  getFilesRecursive,
};
