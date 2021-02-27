const { APIJSONResponse } = require('../../utils/apiUtils');

class MsgNotFoundResponse extends APIJSONResponse {
  constructor(id) {
    super();

    this.message = `The msg with ID ${id} was not found.`;
  }
}

module.exports = MsgNotFoundResponse;
