const { APIJSONResponse } = require('../../utils/apiUtils.js');

class MessageResponse extends APIJSONResponse {
  constructor(message, topic = null) {
    super();

    this.message = message;
    this.topic = topic;
    this.received = false;
  }

  flagReceived() {
    this.received = true;
    this.received_at = new Date();
    this.updated_at = this.received_at;
  }
}

module.exports = MessageResponse;
