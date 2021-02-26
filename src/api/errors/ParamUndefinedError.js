const { APIError } = require('../../utils/apiUtils');

class ParamUndefinedError extends APIError {
  constructor() {
    const id = 'param_undefined';
    const message = 'One or more parameters are missing from the request.';
    const url = 'https://github.com/crlimacastro/message-in-a-bottle/blob/main/documentation.md#paramundefinederror';

    super(id, message, url);
  }
}

module.exports = ParamUndefinedError;
