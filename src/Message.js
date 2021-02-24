const { APIJSONResponse } = require('./utils/serverUtils.js');

class Message extends APIJSONResponse {
  constructor(text) {
    super();

    this.text = text;
    this.received = false;
  }

  flagReceived() {
    this.received = true;
    this.received_at = new Date();
  }
}

module.exports = Message;
