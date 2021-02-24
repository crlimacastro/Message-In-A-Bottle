const { APIError } = require('../../utils/apiUtils.js');

class TextUndefinedError extends APIError {
  constructor() {
    const id = 'text_undefined';
    const message = 'Request did not contain text parameter.';
    const url = 'https://github.com/crlimacastro/message-in-a-bottle/blob/main/documentation.md#textundefinederror';

    super(id, message, url);
  }
}

module.exports = TextUndefinedError;
