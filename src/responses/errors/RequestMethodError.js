const { APIError } = require('../../utils/apiUtils.js');

class RequestMethodError extends APIError {
  constructor() {
    const id = 'request_method';
    const message = 'Server did not accept this request method for this API call.';
    const url = 'https://github.com/crlimacastro/message-in-a-bottle/blob/main/documentation.md#requestmethoderror';

    super(id, message, url);
  }
}

module.exports = RequestMethodError;
