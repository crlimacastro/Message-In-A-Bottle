const fileUtils = require('../../fileUtils.js');
const { ClientFile } = fileUtils;

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

    const filepaths = fileUtils.getFilepathsRecursive(dirPath);

    // Create endpoints and response functions for each file
    filepaths.forEach(filepath => {
        const endpoint = "/" + encodeURI(fileUtils.getCleanPath(fileUtils.path.relative(dirPath, filepath)));
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