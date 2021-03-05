const { ResponseFile } = require('../../fileUtils');
const serverUtils = require('../../serverUtils');
const xmlUtils = require('../../xmlUtils.js');

const { MIMETYPES } = serverUtils;

const respondAPIContent = (request, response, statusCode, content) => {
  const acceptedTypes = serverUtils.getAcceptedTypes(request);

  let parsedContent;
  let type;
  if (acceptedTypes.includes(MIMETYPES.XML)) {
    parsedContent = xmlUtils.parseObjToXML(content);
    type = MIMETYPES.XML;
  } else {
    parsedContent = JSON.stringify(content);
    type = MIMETYPES.JSON;
  }
  const file = new ResponseFile(parsedContent, type);
  return serverUtils.respond(request, response, statusCode, file);
};

module.exports = {
  respondAPIContent,
};
