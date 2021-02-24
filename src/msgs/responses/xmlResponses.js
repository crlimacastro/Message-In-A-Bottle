const msgFetcher = require('../msgFetcher.js');
const xmlUtils = require('../../utils/xmlUtils.js');

// const formatMsgToXML = (json) => `
//   <joke>
//     <q>${json.q}</q>
//     <a>${json.a}"</a>
//   </joke>`;

// const formatJokesToXML = (json) => {
//   let text = '<jokes>';
//   json.forEach((joke) => { text += formatJokeToXML(joke); });
//   text += '</jokes>';

//   return text;
// };

const getRandomMsg = () => {
  const msg = msgFetcher.getRandomMsg();
  if (msg) {
    return xmlUtils.parseJSONToXML(msg);
  }

  return null;
};

// const getRandomJokes = (params) => {
//   const xml = prependVersionXML(formatJokesToXML(msgRandomizer.getRandomJokes(params.limit)));
//   return xml;
// };

module.exports = {
  getRandomMsg,
};
