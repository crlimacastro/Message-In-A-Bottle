const MIMETypes = require('../.jsons/mimetypes.json');
const extensionToMIME = require('../.jsons/extensionToMIME.json');

const dirReader = require('./dirReader.js');
const responseHandler = require('./responseHandler.js');

/**
 * Helper function, extracts file name out of full path.
 * Returns null if not found */
const getFileName = (filepath) => {
    let i = filepath.lastIndexOf('/');
    let j = filepath.lastIndexOf('\\');
    let index = Math.max(i, j);
    return index === -1 ? null : filepath.substring(index + 1);
}

const getFileExtension = (filename) => {
    return filename.substring(filename.lastIndexOf('.') + 1);
}

/** Returns response function for file specified(content) */
const makeFileResponse = (type, statusCode, content) => {
    return (request, response) => {
        responseHandler.respond(request, response, type, statusCode, content)
    };
};

/** Returns urlStruct with server endpoints for files in directory and subdirectories */
const getFilesResponses = (dirPath) => {
    const urlStruct = {}; // Contains all server enpoints

    const filepaths = dirReader.getFilepathsRecursive(dirPath);

    // Create endpoints and response functions for each file
    filepaths.forEach(filepath => {
        const endpoint = "/" + encodeURI(dirReader.getCleanPath(dirReader.relativePath(dirPath, filepath)));
        const file = dirReader.readFileSync(filepath);

        // Figure out what type of file it is
        const fileExtension = getFileExtension(getFileName(filepath));
        const type = MIMETypes[extensionToMIME[fileExtension]]; // Convert from file extension to MIME type

        // Make endpoint
        urlStruct[endpoint] = makeFileResponse(type, 200, file);
    });

    return urlStruct;
};

module.exports = {
    getFilesResponses,
    makeFileResponse
};