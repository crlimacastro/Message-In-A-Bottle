import * as ajax from '../ajax.js';
import * as msgMaker from '../msgMaker.js';

// DOM Elements
let pWelcome;
// Controls
let inputTopic;
let btnGetMessage;
let btnGetReceivedMsgs;
// Pagination Controls
let navPagination;
let btnPreviousPage;
let spanPageInfo;
let btnNextPage;
// Output
let msgContainer;
let ulMessages;
let pFeedback;

// Object with helper methods for page controls
const controls = {
  currentPage: undefined,
  totalPages: undefined,
};

/** Helper function to get number value of limit */
const limit = () => Number(selectLimit.value);

// Clears all client outputs and feedback
const clearOutputs = () => {
  msgContainer.innerHTML = '';
  ulMessages.innerHTML = '';
  pFeedback.innerHTML = '';
};

/** Determines whether pagination controls will be displayed */
const showNavPagination = (bool) => {
  if (bool) {
    navPagination.style.visibility = 'visible';
  } else {
    navPagination.style.visibility = 'hidden';
  }
};

/** Updates paging info element and paging variables */
const updateInfo = (pageResponse) => {
  controls.currentPage = pageResponse.currentPage;
  controls.totalPages = pageResponse.totalPages;

  spanPageInfo.innerHTML = `${controls.currentPage + 1}/${controls.totalPages}`;
};

/** Updates ul element with list of msgs */
const updateUlMessages = (messages) => {
  ulMessages.innerHTML = ''; // Clear ul

  messages.forEach((msg) => {
    ulMessages.appendChild(msgMaker.makeMsg(msg));
  });
};

/** Fetches received messages and updates DOM elements */
const fetchReceived = (limit, page) => {
  ajax.sendGETRequest(`/msg-received?limit=${limit}&page=${page}`, (e) => {
    clearOutputs();

    const xhr = e.target;
    const response = JSON.parse(xhr.response);
    const { messages } = response;

    switch (xhr.status) {
      case 200: // OK
        // If pool is not empty
        if (messages.length > 0) {
          showNavPagination(true);
          updateInfo(response);
          updateUlMessages(messages);
        } else {
          pFeedback.innerHTML = 'You have no messages saved. Try to fish out some.';
        }
        break;
      default:
        pFeedback.innerHTML = 'Status Code Not Handled By Client';
        break;
    }
  });
};

const init = () => {
  pWelcome = document.querySelector('#pWelcome');
  inputTopic = document.querySelector('#inputTopic');
  btnGetMessage = document.querySelector('#btnGetMessage');
  btnGetReceivedMsgs = document.querySelector('#btnGetReceivedMsgs');
  navPagination = document.querySelector('#navPagination');
  btnPreviousPage = document.querySelector('#btnPreviousPage');
  spanPageInfo = document.querySelector('#spanPageInfo');
  btnNextPage = document.querySelector('#btnNextPage');
  msgContainer = document.querySelector('#msgContainer');
  ulMessages = document.querySelector('#ulMessages');
  pFeedback = document.querySelector('#pFeedback');

  showNavPagination(false); // Hide pagination controls at the beginning

  // Get a random welcome message from the array
  fetch('src/app/randWelcomes.json')
    .then(response => {
      return response.json();
    })
    .then(welcomeMessages => {
      if (welcomeMessages) {
        let i = Math.floor(Math.random() * welcomeMessages.length);
        pWelcome.innerHTML = welcomeMessages[i];
      }
    });

  // Events
  btnGetMessage.onclick = () => {
    ajax.sendGETRequest(`/msg-random?topic=${inputTopic.value}`, (e) => {
      clearOutputs();

      const xhr = e.target;

      switch (xhr.status) {
        case 200: { // OK
          const msg = JSON.parse(xhr.response);

          switch (msg.type) {
            case 'MessageResponse':
              msgContainer.appendChild(msgMaker.makeMsgLite(msg));
              break;
            case 'PoolEmptyResponse':
              pFeedback.innerHTML = 'There are currently no messages out at sea. Check back later or write your own.';
              break;
            case 'TopicEmptyResponse':
              pFeedback.innerHTML = 'There are no messages in this topic.';
              break;
            default:
              pFeedback.innerHTML = 'Response Type not handled by client';
              break;
          }
          break;
        }
        case 400: { // Bad Request

        }
        default:
          pFeedback.innerHTML = 'Status Code not handled by client';
          break;
      }
    });
  };

  btnGetReceivedMsgs.onclick = () => {
    fetchReceived(limit(), 0);
  };

  btnPreviousPage.onclick = () => {
    if (controls.currentPage > 0) {
      controls.currentPage -= 1;
      fetchReceived(limit(), controls.currentPage);
    }
  };

  btnNextPage.onclick = () => {
    if (controls.currentPage < controls.totalPages - 1) {
      controls.currentPage += 1;
      fetchReceived(limit(), controls.currentPage);
    }
  };
};

export {
  init,
};