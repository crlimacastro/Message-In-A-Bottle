const { APIJSONResponse } = require('../../utils/apiUtils');

class TopicEmptyResponse extends APIJSONResponse {
  constructor() {
    super();

    this.message = 'There are currently no messages with this topic.';
  }
}

module.exports = TopicEmptyResponse;
