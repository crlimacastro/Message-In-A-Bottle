class ResponseFile {
  /**
     * Class to hold files' info
     * @param {String} content
     * @param {String} type
     */
  constructor(content, type) {
    this.content = content;
    this.type = type;
  }
}

module.exports = ResponseFile;
