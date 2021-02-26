const admin = require('./adminEndpoints.js');
const app = require('./appEndpoints.js');
const write = require('./writeEndpoints.js');

module.exports = {
  ...admin,
  ...app,
  ...write,
};
