const { APIError } = require('../../utils/serverUtils.js');

class EmptyPoolError {
    constructor() {
        const id = "empty_pool";
        const message = "There are currently no messages out at sea. Check back later or write your own.";
        const url = "";

        super(id, message, url);
    }
}