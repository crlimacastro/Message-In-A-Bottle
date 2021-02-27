const { APIJSONResponse } = require('../../utils/apiUtils');

class PoolEmptyResponse extends APIJSONResponse {
  constructor() {
    super();

    this.message = 'There are currently no messages in the pool.';
  }
}

module.exports = PoolEmptyResponse;
