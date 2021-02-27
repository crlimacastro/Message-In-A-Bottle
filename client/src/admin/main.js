import * as ajax from '../ajax.js';
import * as msgMaker from '../msgMaker.js';

// DOM Elements
// Controls
let selectLimit;
let btnGetAllMsgs;
let btnClearPool;
// Pagination Controls
let navPagination;
let btnPreviousPage;
let spanPageInfo;
let btnNextPage;
// Output
let ulMessages;
let pFeedback;

// Object with helper methods for page controls
const controls = {
  currentPage: undefined,
  totalPages: undefined,
};

/** Helper function to get number value of limit */
const limit = () => Number(selectLimit.value);

/** Clears all client outputs and feedback */
const clearOutputs = () => {
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
    ulMessages.appendChild(msgMaker.makeMsgAdmin(msg, pFeedback));
  });
};

/** Fetches pool messages and updates DOM elements */
const fetchPool = (limit, page) => {
  ajax.sendGETRequest(`/pool?limit=${limit}&page=${page}`, (e) => {
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
          pFeedback.innerHTML = 'There are currently no messages in the pool';
        }
        break;
      case 400: // Bad Request
        pFeedback.innerHTML = response.message;
        break;
      default:
        pFeedback.innerHTML = 'Status Code Not Handled By Client';
        break;
    }
  });
};

const init = () => {
  selectLimit = document.querySelector('#selectLimit');
  btnGetAllMsgs = document.querySelector('#btnGetAllMsgs');
  btnClearPool = document.querySelector('#btnClearPool');
  navPagination = document.querySelector('#navPagination');
  btnPreviousPage = document.querySelector('#btnPreviousPage');
  spanPageInfo = document.querySelector('#spanPageInfo');
  btnNextPage = document.querySelector('#btnNextPage');
  ulMessages = document.querySelector('#ulMessages');
  pFeedback = document.querySelector('#pFeedback');

  showNavPagination(false); // Hide pagination controls at the beginning

  btnGetAllMsgs.onclick = () => {
    fetchPool(limit(), 0);
  };

  btnClearPool.onclick = () => {
    if (confirm('Are you sure you wish to clear all data from the server?')) {
      ajax.sendDELETERequest('/pool-clear', (e) => {
        clearOutputs();
        showNavPagination(false);

        const xhr = e.target;
        const response = JSON.parse(xhr.response);

        switch (xhr.status) {
          case 200: // OK
            pFeedback.innerHTML = response.message;
            break;
          case 405: // Method Not Allowed
            pFeedback.innerHTML = response.message;
            break;
          default:
            pFeedback.innerHTML = 'Status Code not handled by client';
            break;
        }
      });
    }
  };

  btnPreviousPage.onclick = () => {
    if (controls.currentPage > 0) {
      controls.currentPage -= 1;
      fetchPool(limit(), controls.currentPage);
    }
  };

  btnNextPage.onclick = () => {
    if (controls.currentPage < controls.totalPages - 1) {
      controls.currentPage += 1;
      fetchPool(limit(), controls.currentPage);
    }
  };
};

export {
  init,
};