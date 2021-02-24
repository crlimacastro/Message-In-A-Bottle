const fileUtils = require('./fileUtils.js');

const classPath = `${__dirname}/.serverUtils/classes/`;
const classes = fileUtils.getExportsRecursive(classPath);

const jsonPath = `${__dirname}/.serverUtils/json/`;
const json = fileUtils.getExportsRecursive(jsonPath);

const utilsPath = `${__dirname}/.serverUtils/js/`;
const utils = fileUtils.getExportsRecursive(utilsPath);

module.exports = {
  ...classes,
  ...json,
  ...utils,
};
