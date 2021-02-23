// Classes
const ClientFile = require('../.classes/clientFile.js');

// Internal modules
const fileReader = require('./fileReader.js');
const responseHandler = require('./respond.js');

/** Returns response function for file */
const makeFileResponse = (statusCode, file) => {
    return (request, response) => {
        responseHandler.respond(request, response, statusCode, file);
    };
};

/** Returns response function for file at specified path */
const makePathResponse = (statusCode, filepath) => {
    const file = new ClientFile(filepath);
    return makeFileResponse(statusCode, file);
};

/** Returns urlStruct with server endpoints for files in directory and subdirectories */
const getFilesResponses = (dirPath) => {
    const urlStruct = {}; // Contains all server enpoints

    const filepaths = fileReader.getFilepathsRecursive(dirPath);

    // Create endpoints and response functions for each file
    filepaths.forEach(filepath => {
        const endpoint = "/" + encodeURI(fileReader.getCleanPath(fileReader.relativePath(dirPath, filepath)));
        const file = new ClientFile(filepath);

        // Make endpoint
        urlStruct[endpoint] = makeFileResponse(200, file);
    });

    return urlStruct;
};

module.exports = {
    makeFileResponse,
    makePathResponse,
    getFilesResponses,
};