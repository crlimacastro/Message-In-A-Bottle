/** Returns string of xml tag at the beginning of xml files stating version, encoding, etc. */
const getXMLInfo = () => '<?xml version="1.0" encoding="UTF-8"?>';

/** Returns xml string with obj properties as tags and values inside the tags */
const getKeysAsXML = (obj) => {
  let xml = '';
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    // If it is a nested object
    if (obj[key] && typeof obj[key] === 'object') {
      xml += `<${key}>${getKeysAsXML(obj[key])}</${key}>`;
    } else {
      xml += `<${key}>${obj[key]}</${key}>`;
    }
  });

  return xml;
};

/** Returns object fully parsed into XML */
const parseObjToXML = (obj) => getXMLInfo() + getKeysAsXML(obj);

/** Returns JSON string parsed into XML */
const parseJSONStrToXML = (jsonStr) => getXMLInfo() + getKeysAsXML(JSON.parse(jsonStr));

module.exports = {
  getXMLInfo,
  getKeysAsXML,
  parseObjToXML,
  parseJSONStrToXML,
};
