const fs = require('fs'); // file system module
const serverUtils = require('../serverUtils.js');
const MIMETypes = require('../mimetypes.json');

// Read css files in
const defaultStyles = fs.readFileSync(`${__dirname}/../../client/default-styles.css`);

const getDefaultStyles = (request, response) => {
  serverUtils.respond(request, response, MIMETypes.CSS, 200, defaultStyles);
};

module.exports.getDefaultStyles = getDefaultStyles;
