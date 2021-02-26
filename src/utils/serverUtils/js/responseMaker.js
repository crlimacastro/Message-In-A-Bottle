const fileUtils = require('../../fileUtils');
const responseHandler = require('./responseHandler.js');

const { ClientFile } = fileUtils;

/** Returns response function for file */
const makeFileResponse = (statusCode, file) => (request, response) => {
  responseHandler.respond(request, response, statusCode, file);
};

/** Returns response function for file at specified path */
const makePathResponse = (statusCode, filepath) => {
  const file = new ClientFile(filepath);
  return makeFileResponse(statusCode, file);
};

/** Returns urlStruct with server endpoints for files in directory */
const getFilesResponses = (dirPath) => {
  const urlStruct = {}; // Contains all server enpoints
  const filepaths = fileUtils.getFilepaths(dirPath);

  // Create endpoints and response functions for each file
  filepaths.forEach((filepath) => {
    const endpoint = `/${encodeURI(fileUtils.getCleanPath(fileUtils.path.relative(dirPath, filepath)))}`;
    const response = makePathResponse(200, filepath);
    urlStruct[endpoint] = response;
  });

  return urlStruct;
};

/** Returns urlStruct with server endpoints for files in directory and subdirectories */
const getFilesResponsesRecursive = (dirPath) => {
  const urlStruct = {}; // Contains all server enpoints
  const filepaths = fileUtils.getFilepathsRecursive(dirPath);

  // Create endpoints and response functions for each file
  filepaths.forEach((filepath) => {
    const endpoint = `/${encodeURI(fileUtils.getCleanPath(fileUtils.path.relative(dirPath, filepath)))}`;
    const response = makePathResponse(200, filepath);
    urlStruct[endpoint] = response;
  });

  return urlStruct;
};

module.exports = {
  makeFileResponse,
  makePathResponse,
  getFilesResponses,
  getFilesResponsesRecursive,
};
