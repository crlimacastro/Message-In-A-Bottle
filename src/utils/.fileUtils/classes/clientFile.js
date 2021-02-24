// External modules
const fs = require('fs');
const mime = require('mime'); // https://github.com/broofa/mime

// Internal modules
const File = require("./file");

class ClientFile extends File {
    constructor(path) {
        const content = fs.readFileSync(path); 
        const type = mime.getType(path);
        super(content, type);

        this.path = path;
    }
}

module.exports = ClientFile;