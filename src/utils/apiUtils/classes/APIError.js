class APIError {
  constructor(id, message, url) {
    this.id = id;
    this.message = message;
    this.url = url;
  }
}

module.exports = APIError;
