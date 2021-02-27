const { v4: uuidv4 } = require('uuid'); // UUID generator
const userData = require('./data/userData.json');

const mathUtils = require('../utils/mathUtils');

const {
  users, // Object containing users saved by ID
  IPTOID, // Object containing user IP Addrs -> ID conversion
  IDTOIP, // Object containing user ID -> IP Addrs conversion
} = userData;

// #region Helper Functions

const createUser = (ip) => {
  const id = uuidv4(); // Generate UUID for user
  IPTOID[ip] = id; // Save it
  IDTOIP[id] = ip; // Save the inverse conversion
  // Create empty object for user data
  users[id] = {
    savedMsgs: {},
  };
};

// #endregion

// #region User Functions

/** Returns whether the user exists */
const isUser = (ip) => {
  if (IPTOID[ip]) { return true; }
  return false;
};

/**
 * Returns id of user.
 * Returns null if none found
 * @param {String} ip
 */
const getUserID = (ip) => {
  const id = IPTOID[ip];
  if (id) {
    return id;
  }

  return null;
};

const getUsers = () => users;

// #endregion

// #region Msg Functions

/**
 * Saves message to user storage
 * @param {MessageResponse} msgObj
 * @param {String} ip
 */
const saveMsg = (msgObj, ip) => {
  // If there is a message
  if (msgObj) {
    // If user is found
    if (isUser(ip)) {
      const id = getUserID(ip);
      users[id].savedMsgs[msgObj.id] = msgObj;
    } else {
      createUser(ip);
      const id = getUserID(ip);
      users[id].savedMsgs[msgObj.id] = msgObj;
    }
  }
};

/**
 * Returns amount of msgs a user has received.
 * Returns null if user not found.
 */
const savedMsgsCount = (id) => {
  const user = users[id];

  if (user) {
    return Object.keys(users[id].savedMsgs).length;
  }

  return null;
};

/**
 * Returns a number of messages a user has saved.
 * Returns an empty array if user not found.
 * @param {Number} id ID of the user
 * @param {Number} limit Amount to get back.
 * @param {Number} offset Index to start from. */
const peekSavedMsgs = (id, limit = 1, offset = 0) => {
  const user = users[id];

  if (user) {
    const count = savedMsgsCount(id);

    let i = offset ? Number(offset) : 0; // cast offset to a number
    i = mathUtils.clamp(i, 0, count - 1); // clamp between 0 and count
    i = Math.floor(i); // make sure it is an integer

    let lim = limit ? Number(limit) : 1; // cast limit to a number

    lim = mathUtils.clamp(lim, 0, count - i); // clamp between 0 and last index remaining
    lim = Math.floor(lim); // make sure it is an integer

    const values = Object.values(users[id].savedMsgs); // Get array of msgs
    return values.slice(i, i + lim);
  }

  return [];
};

// #endregion

module.exports = {
  isUser,
  getUserID,
  getUsers,
  createUser,
  saveMsg,
  peekSavedMsgs,
  savedMsgsCount,
};
