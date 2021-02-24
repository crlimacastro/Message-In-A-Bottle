const { v4: uuidv4 } = require('uuid'); // UUID generator
const os = require('os'); // Default node module

class APIJSONResponse {
    constructor () {
        // API standard requirements
        this.created_at = new Date();
        this.updated_at = new Date();
        this.hostname = os.hostname();
        this.id = uuidv4();
    }
}

module.exports = APIJSONResponse;