const { APIJSONResponse } = require('../../utils/apiUtils');

class MsgCreatedResponse extends APIJSONResponse {
  constructor() {
    super();

    this.message = 'Message Created Successfully';
  }
}

module.exports = MsgCreatedResponse;
