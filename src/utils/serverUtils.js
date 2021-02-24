const fileUtils = require('./fileUtils.js');

const classDirPath = `${__dirname}/.serverUtils/classes/`;
const classes = fileUtils.getExportsRecursive(classDirPath);

const jsonDirPath = `${__dirname}/.serverUtils/json/`;
const json = fileUtils.getExportsRecursive(jsonDirPath);

const utilsDirPath = `${__dirname}/.serverUtils/js/`;
const utils = fileUtils.getExportsRecursive(utilsDirPath);

module.exports = {
  ...classes,
  ...json,
  ...utils,
};
