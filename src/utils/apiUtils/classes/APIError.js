class APIError {
  constructor(message, url) {
    this.id = this.constructor.name;
    this.message = message;
    this.url = url;
  }
}

module.exports = APIError;
