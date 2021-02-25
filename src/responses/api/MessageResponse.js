const { APIJSONResponse } = require('../../utils/apiUtils.js');

class MessageResponse extends APIJSONResponse {
  constructor(message) {
    super();

    this.message = message;
    this.received = false;
  }

  flagReceived() {
    this.received = true;
    this.received_at = new Date();
    this.updated_at = this.received_at;
  }
}

module.exports = MessageResponse;
