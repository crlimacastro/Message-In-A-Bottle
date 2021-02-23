// File/Directory reader
// Contains helper functions to get files and filepaths from directories

// External modules
const fs = require('fs'); // Import file system
const path = require('path');

// Internal modules
const File = require('../.classes/file.js');

const getCleanPath = (filepath) => path.normalize(filepath).replace(/\\/g, '/');

/** Returns all files'(not directories) paths in a specified directory only */
const getFilepaths = (dirPath) => {
    // If path is a directory 
    if (fs.statSync(dirPath).isDirectory()) {
        const files = fs.readdirSync(dirPath); // Read all files in directory
        files = files.filter(file => !fs.statSync(dirPath + file).isDirectory()); // Remove directories from list
        return files.map(file => getCleanPath(path.join(dirPath, file))); // Return array of paths to each file
    }
    else {
        throw new TypeError('dirPath is not a path to a directory.');
    }
}

/**
 * Returns array of paths to all files in a directory and all subdirectories
 * Second parameter not necessary for function call (used within the recursion)
 * // https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js */
const getFilepathsRecursive = (dirPath, pathsArray) => {
    // If path is a directory 
    if (fs.statSync(dirPath).isDirectory()) {
        pathsArray = pathsArray || [] // Create empty array on first call
        const files = fs.readdirSync(dirPath); // Read all files in current directory

        files.forEach(file => {
            if (fs.statSync(dirPath + file).isDirectory()) {
                // Recursively call this function if one of the files is a directory
                pathsArray = getFilepathsRecursive(dirPath + file + "/", pathsArray);
            }
            else {
                // Push filepaths that are not directories into array
                pathsArray.push(getCleanPath(path.join(dirPath, file)));
            }
        });

        return pathsArray;
    }
    else {
        throw new TypeError('dirPath is not a path to a directory.');
    }
}

/** Returns all files(not directories) in a specified directory only */
const getFiles = (dirPath) => {
    // If path is a directory 
    if (fs.statSync(dirPath).isDirectory()) {
        const filepaths = getFilepaths(dirPath);
        return filepaths.map(filepath => new File(filepath)); // Return array of files of each path
    }
    else {
        throw new TypeError('dirPath is not a path to a directory.');
    }
}

/** Returns array of files in a directory and all subdirectories */
const getFilesRecursive = (dirPath) => {
    // If path is a directory 
    if (fs.statSync(dirPath).isDirectory()) {
        const filepaths = getFilepathsRecursive(dirPath);
        const files = [];

        return filepaths.map(filepath => new File(filepath));
    }
    else {
        throw new TypeError('dirPath is not a path to a directory.');
    }
}

module.exports = {
    getCleanPath,
    getFilepaths,
    getFilepathsRecursive,
    getFiles,
    getFilesRecursive,
    relativePath: path.relative,
    resolvePath: path.resolve,
}