const { APIJSONResponse } = require('../../utils/apiUtils');

class PoolClearedResponse extends APIJSONResponse {
  constructor() {
    super();

    this.message = 'Pool Cleared Successfully';
  }
}

module.exports = PoolClearedResponse;
