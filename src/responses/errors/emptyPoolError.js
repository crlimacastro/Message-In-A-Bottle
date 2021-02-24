const { APIError } = require('../../utils/apiUtils.js');

class EmptyPoolError extends APIError {
  constructor() {
    const id = 'empty_pool';
    const message = 'There are currently no messages out at sea. Check back later or write your own.';
    const url = 'https://github.com/crlimacastro/message-in-a-bottle/blob/main/documentation.md#emptypoolerror';

    super(id, message, url);
  }
}

module.exports = EmptyPoolError;
