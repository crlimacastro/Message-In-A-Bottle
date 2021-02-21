const fs = require('fs'); // file system module
const serverUtils = require('../serverUtils.js');
const MIMETypes = require('../mimetypes.json');

// Read html files in
const errorPage = fs.readFileSync(`${__dirname}/../../client/error.html`);

const get404Response = (request, response) => {
  serverUtils.respond(request, response, MIMETypes.HTML, 404, errorPage);
};

module.exports.get404Response = get404Response;
