const http = require('http');

class Server {
    /** Callback that determines server behaviour
     * @callback onRequestCallback
     * @param {Object} request: what comes from client to server
     * @param {Object} response: what is sent back
    */

    /** Creates a server
     * @param {onRequestCallback} onRequest */
    constructor(onRequest) {
        this.onRequest = onRequest;
    }

    /** Helper function, initializes server on specified port */
    init(port) {
        // Create the server
        // Hook up the request handling function
        // Start listening on `port`
        http.createServer(this.onRequest).listen(port);
    }
}

module.exports = Server;