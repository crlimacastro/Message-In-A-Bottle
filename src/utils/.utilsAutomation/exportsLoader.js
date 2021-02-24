const fsExtension = require('./fsExtension.js');

/** Get everything exported in the files of a directory */
const getExports = (dirPath) => {
    const filepaths = fsExtension.getFilepaths(dirPath);
    const exports = {};
    filepaths.forEach(path => {
        const moduleExport = require(path);
        const keys = Object.keys(moduleExport);

        // If there is more than one export in the file (true for non-classes)
        if (keys.length > 0) {
            keys.forEach(key => {
                exports[key] = moduleExport[key];
            });
        }
        else {
            exports[moduleExport.name] = moduleExport;
        }
    });

    return exports;
};

/** Get everything exported in the files of a directory and its subdirectories */
const getExportsRecursive = (dirPath) => {
    const filepaths = fsExtension.getFilepathsRecursive(dirPath);
    const exports = {};
    filepaths.forEach(path => {
        const moduleExport = require(path);
        const keys = Object.keys(moduleExport);

        // If there is more than one export in the file (true for non-classes)
        if (keys.length > 0) {
            keys.forEach(key => {
                exports[key] = moduleExport[key];
            });
        }
        else {
            exports[moduleExport.name] = moduleExport;
        }
    });

    return exports;
};

module.exports = {
    getExports,
    getExportsRecursive,
};