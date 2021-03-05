const { APIJSONResponse } = require('../../utils/apiUtils');

class NoSavedMsgResponse extends APIJSONResponse {
  constructor() {
    super();

    this.message = 'User has no saved messages';
  }
}

module.exports = NoSavedMsgResponse;
