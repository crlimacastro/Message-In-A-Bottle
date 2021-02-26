const { ResponseFile } = require('../../fileUtils');
const serverUtils = require('../../serverUtils');
const xmlUtils = require('../../xmlUtils.js');

const { MIMETYPES } = serverUtils;

const respondAPIContent = (request, response, statusCode, content) => {
  const acceptedTypes = serverUtils.getAcceptedTypes(request);
  let parsedContent = JSON.stringify(content);
  let type = MIMETYPES.JSON;
  if (acceptedTypes.includes(MIMETYPES.XML)) {
    parsedContent = xmlUtils.parseJSONToXML(parsedContent);
    type = MIMETYPES.XML;
  }
  const file = new ResponseFile(parsedContent, type);
  return serverUtils.respond(request, response, statusCode, file);
};

module.exports = {
  respondAPIContent,
};
