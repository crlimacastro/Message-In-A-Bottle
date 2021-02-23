// Directory reader
// Contains helper functions to get files and filepaths from directories

// External modules
const fs = require('fs'); // Import file system
const path = require('path');

const getCleanPath = (filepath) => path.normalize(filepath).replace(/\\/g, '/');

/**
 * Returns array of paths to all files in a directory and all subdirectories
 * Second parameter not necessary for function call (used within the recursion)
 * // https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js */
const getFilepathsRecursive = (dirPath, pathsArray) => {
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

/** Returns array of files in a directory and all subdirectories */
const getFilesRecursive = (dirPath) => {
    const filepaths = getFilepathsRecursive(dirPath);
    const files = [];
    
    filepaths.forEach(filepath => {
        const file = fs.readFileSync(filepath);
        files.push(file);
    });

    return files;
}

module.exports = {
    getCleanPath,
    getFilepathsRecursive,
    getFilesRecursive,
    readFileSync: fs.readFileSync,
    relativePath: path.relative,
    normalizePath: path.normalize,
    resolvePath: path.resolve,
}