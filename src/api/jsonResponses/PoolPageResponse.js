const { APIJSONResponse } = require('../../utils/apiUtils');

class PoolPageResponse extends APIJSONResponse {
  constructor(messages, totalPages, currentPage) {
    super();

    this.messages = messages;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
  }
}

module.exports = PoolPageResponse;
