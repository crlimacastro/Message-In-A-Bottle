const { v4: uuidv4 } = require('uuid'); // UUID generator

class Message {
  constructor(text) {
    this.created_at = new Date();
    this.id = uuidv4();

    this.text = text;
    this.received = false;
  }

  flagReceived() {
    this.received = true;
    this.received_at = new Date();
  }
}

module.exports = Message;
