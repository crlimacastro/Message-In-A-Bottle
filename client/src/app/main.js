import * as ajax from '../ajax.js';
import * as msgMaker from '../msgMaker.js';

// Clears all client outputs and feedback
const clearOutputs = () => {
  msgContainer.innerHTML = '';
  ulMessages.innerHTML = '';
  pFeedback.innerHTML = '';
};

/** Updates ul element with list of msgs */
const updateUlMessages = (messages) => {
  ulMessages.innerHTML = ''; // Clear ul

  for (const msg of messages) {
    ulMessages.appendChild(msgMaker.makeMsg(msg));
  }
};

const init = () => {
  // DOM Elements
  // Controls
  const inputTopic = document.querySelector('#inputTopic');
  const btnGetMessage = document.querySelector('#btnGetMessage');
  const btnGetReceivedMsgs = document.querySelector('#btnGetReceivedMsgs');
  // Output
  const msgContainer = document.querySelector('#msgContainer');
  const ulMessages = document.querySelector('#ulMessages');
  const pFeedback = document.querySelector('#pFeedback');

  btnGetMessage.onclick = () => {
    ajax.sendGETRequest(`/msg-random?topic=${inputTopic.value}`, (e) => {
      clearOutputs();

      const xhr = e.target;

      switch (xhr.status) {
        case 200: // OK
          const msg = JSON.parse(xhr.response);
          msgContainer.innerHTML = ''; // Clear container
          msgContainer.appendChild(msgMaker.makeMsgLite(msg));
          break;
        case 204: // No Content
          if (inputTopic.value === '') {
            pFeedback.innerHTML = 'There are currently no messages out at sea. Check back later or write your own.';
          } else {
            pFeedback.innerHTML = 'There are no messages in this topic.';
          }
          break;
        default:
          pFeedback.innerHTML = 'Status Code not handled by client';
          break;
      }
    });
  };

  btnGetReceivedMsgs.onclick = () => {
    ajax.sendGETRequest('/msg-received', (e) => {
      clearOutputs();

      const xhr = e.target;

      switch (xhr.status) {
        case 200: // OK
          const response = JSON.parse(xhr.response);
          const messages = Object.values(response);

          // If pool is not empty
          if (messages.length > 0) {
            updateUlMessages(messages);
          }
          break;
        case 204: // No Content
          pFeedback.innerHTML = 'You have no messages saved. Try to fish out some.';
          break;
        default:
          pFeedback.innerHTML = 'Status Code not handled by client';
          break;
      }
    });
  };
};

export {
  init,
};
