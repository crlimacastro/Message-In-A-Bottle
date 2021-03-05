const { APIError } = require('../../utils/apiUtils');

class RequestMethodError extends APIError {
  constructor() {
    const message = 'Server did not accept this request method for this API call';
    const url = 'https://github.com/crlimacastro/message-in-a-bottle/blob/main/documentation.md#requestmethoderror';

    super(message, url);
  }
}

module.exports = RequestMethodError;
