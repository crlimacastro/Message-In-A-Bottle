const query = require('querystring');

/** Returns an object with paramaters of POST request
 * @param {Array} body POST request body array
 */
const getBodyParams = (body) => query.parse(Buffer.concat(body).toString());

module.exports = {
    getBodyParams,
}