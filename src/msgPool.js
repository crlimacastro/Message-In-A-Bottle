const msgsJSON = require('./msgs.json');
const mathUtils = require('./utils/mathUtils.js');
const MessageResponse = require('./responses/api/MessageResponse.js');

const { msgPool, topics } = msgsJSON;

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

/** Helper function to retrieve random element from array */
const fetchRandomMsg = (arr) => {
  if (arr) {
    const i = Math.floor(Math.random() * arr.length);
    const msg = arr[i];
    arr.splice(i, 1); // Remove msg from array
    msg.flagReceived(); // Flag as received

    // TODO: Update msgs file

    return msg;
  }

  return null;
};

/** Returns a random message & removes it from the pool.
 *  Returns null if empty. */
const popRandom = (topic = null) => {
  const t = topic ? topic.toLowerCase() : null;

  if (msgPool.length > 0) {
    // If a topic was specified
    if (t) {
      // If the topic exists
      if (topics[t]) {
        const msgObj = fetchRandomMsg(topics[t]);

        // If topic is empty delete it
        if (topics[msgObj.topic].length === 0) {
          delete topics[msgObj.topic];
        }

        // Remove it from public pool as well
        const i = msgPool.findIndex((m) => m.id === msgObj.id);
        msgPool.splice(i, 1);

        return msgObj;
      }

      // If the topic didn't exist, return null
      return null;
    }
    // Topic == null
    const msgObj = fetchRandomMsg(msgPool);

    // If this randomly retrieved msg has a topic
    if (msgObj.topic) {
      // Remove it from topic as well
      const i = topics[msgObj.topic].findIndex((m) => m.id === msgObj.id);
      topics[msgObj.topic].splice(i, 1);

      // If topic is empty delete it
      if (topics[msgObj.topic].length === 0) {
        delete topics[msgObj.topic];
      }
    }

    return msgObj;
  }

  return null;
};

/** Adds a message to the pool */
const push = (message, topic = null) => {
  const t = topic ? topic.toLowerCase() : null;

  const msgObj = new MessageResponse(message, t);

  // Add it to public pool
  msgPool.push(msgObj);

  // Add it to topic pool
  if (t) {
    if (topics[t]) {
      // If topic exists, push message to it
      topics[t].push(msgObj);
    } else {
      // Create array if first message in topic
      topics[t] = [msgObj];
    }
  }

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
