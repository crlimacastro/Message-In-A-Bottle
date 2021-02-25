const msgsJSON = require('./msgs.json');
const mathUtils = require('./utils/mathUtils.js');
const MessageResponse = require('./responses/api/MessageResponse.js');

const { msgPool } = msgsJSON;

/**
 * Returns a number of saved messages in msgs file.
 * @param {Number} limit Number of messages to get back.
 * @param {Number} offset Index to start from. */
const peek = (limit = 1, offset = 0) => {
  let i = Number(offset); // cast offset to a number
  i = mathUtils.clamp(i, 0, msgPool.length - 1); // clamp between 0 and array length
  i = Math.floor(i); // make sure it is an integer

  let lim = Number(limit); // cast limit to a number
  lim = mathUtils.clamp(lim, 0, msgPool.length - i); // clamp between 0 and last index remaining
  lim = Math.floor(lim); // make sure it is an integer

  return msgPool.slice(i, i + lim);
};

/** Returns a random message & removes it from the pool.
 *  Returns null if empty. */
const popRandom = () => {
  if (msgPool.length > 0) {
    // Get random message
    const i = Math.floor(Math.random() * msgPool.length);
    const msg = msgPool[i];

    msgPool.splice(i, 1); // Remove msg from array
    // TODO: Update msgs file

    msg.flagReceived(); // Flag as received
    return msg;
  }

  return null;
};

/** Adds a message to the pool */
const push = (message) => {
  const msgObj = new MessageResponse(message);
  msgPool.push(msgObj);
  // TODO: Update msgs file
};

/** Returns how many messages are in the pool. */
const count = () => msgPool.length;

module.exports = {
  peek,
  popRandom,
  push,
  count,
};
