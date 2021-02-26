const { APIJSONResponse } = require('../../utils/apiUtils');

class MsgDeletedResponse extends APIJSONResponse {
  constructor() {
    super();

    this.message = 'Message Deleted Successfully';
  }
}

module.exports = MsgDeletedResponse;
