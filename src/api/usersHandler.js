const { v4: uuidv4 } = require('uuid'); // UUID generator
const userData = require('./data/userData.json');

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
 * Returns saved msgs for user.
 * Returns null if user not found.
 * @param {String} id
 */
const getSavedMsgs = (id) => {
  const user = users[id];
  if (user) {
    return users[id].savedMsgs;
  }

  return null;
};

// #endregion

module.exports = {
  isUser,
  getUserID,
  getUsers,
  createUser,
  saveMsg,
  getSavedMsgs,
};
