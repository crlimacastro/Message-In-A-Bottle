/** Returns string of xml tag at the beginning of xml files stating version, encoding, etc. */
const getXMLInfo = () => '<?xml version="1.0" encoding="UTF-8"?>';

/** Returns xml string with JSON's properties as tags and values inside the tags */
const getKeysAsXML = (json) => {
  let xml = '';
  const keys = Object.keys(json);
  keys.forEach((key) => {
    if (Object.keys(json[key])) {
      getKeysAsXML(json[key]);
    } else {
      xml += `<${key}>${json[key]}</${key}>`;
    }
  });
  return xml;
};

/** Returns json fully parsed into XML */
const parseJSONToXML = (json) => getXMLInfo() + getKeysAsXML(json);

module.exports = {
  getXMLInfo,
  getKeysAsXML,
  parseJSONToXML,
};
