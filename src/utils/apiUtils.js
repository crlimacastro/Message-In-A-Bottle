const fileUtils = require('./fileUtils.js');

const classPath = `${__dirname}/.apiUtils/classes/`;
const classes = fileUtils.getExportsRecursive(classPath);

module.exports = {
  ...classes,
};
