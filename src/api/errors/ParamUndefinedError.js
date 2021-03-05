const { APIError } = require('../../utils/apiUtils');

class ParamUndefinedError extends APIError {
  constructor() {
    const message = 'One or more parameters are missing from the request';
    const url = 'https://github.com/crlimacastro/message-in-a-bottle/blob/main/documentation.md#paramundefinederror';

    super(message, url);
  }
}

module.exports = ParamUndefinedError;
