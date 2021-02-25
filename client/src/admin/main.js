import * as ajax from '../ajax.js';

const init = () => {
    // DOM Elements
    const controls = document.querySelector("#controls");
    const limit = document.querySelector("#limit");
    const btnGetAllMsgs = document.querySelector("#btnGetAllMsgs");
    const ulMessages = document.querySelector("#ulMessages");
    const pFeedback = document.querySelector("#pFeedback");

    let navPagination = null; // Nav element with controls for pagination
    let pPaging = null; // P tag holding page info (current/total)

    // Pagination Variables
    let lim = limit.value;
    let currentPage = null;
    let totalPages = null;

    /** Updates paging info p element and paging variables */
    const updatePaginationInfo = (response) => {
        currentPage = response.currentPage;
        totalPages = response.totalPages;

        pPaging.innerHTML = `${currentPage + 1}/${totalPages}`;
    };

    /** Updates ul element with fetched response data */
    const updateUlMessages = (response) => {
        ulMessages.innerHTML = ''; // Clear ul 
        const messages = response.messages; // Get msg array

        for (const msg of messages) {
            // Create DOM Elements
            const pMessage = document.createElement("p");
            pMessage.innerHTML = `Message: ${msg.message}`;
            const pTopic = document.createElement("p");
            pTopic.innerHTML = `Topic: ${msg.topic}`;
            const pCreatedAt = document.createElement("p");
            pCreatedAt.innerHTML = `Created at: ${new Date(msg.created_at).toGMTString()}`;
            const divElement = document.createElement("div");
            divElement.classList.add('message');

            // Update the DOM
            divElement.appendChild(pMessage);
            divElement.appendChild(pTopic);
            divElement.appendChild(pCreatedAt);
            ulMessages.appendChild(divElement);
        }
    };

    const fetchPreviousPage = (pPaging) => {
        if (currentPage > 0) {
            currentPage--;
            fetchPool(lim, currentPage);
        }
    };

    const fetchNextPage = (pPaging) => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            fetchPool(lim, currentPage);
        }
    };

    /** Creates pagination buttons and text */
    const createPaginationControls = (response) => {
        navPagination = document.createElement("nav");
        navPagination.id = "navPagination";

        // Previous Page Button
        const btnPrevious = document.createElement("button");
        btnPrevious.innerHTML = '&lt&lt Previous Page';
        btnPrevious.onclick = () => fetchPreviousPage(pPaging);

        // Paging Info
        pPaging = document.createElement("p");
        pPaging.innerHTML = `${currentPage + 1}/${totalPages}`;

        // Next Page Button
        const btnNext = document.createElement("button");
        btnNext.innerHTML = 'Next Page &gt&gt';
        btnNext.onclick = () => fetchNextPage(pPaging);

        // Update the DOM
        navPagination.appendChild(btnPrevious);
        navPagination.appendChild(pPaging);
        navPagination.appendChild(btnNext);
        controls.appendChild(navPagination);
    };

    /** Fetches pool messages and updates DOM elements */
    const fetchPool = (limit, page) => {
        ajax.sendGETRequest(`/pool?limit=${limit}&page=${page}`, (e) => {
            const xhr = e.target;
            const response = JSON.parse(xhr.response);

            switch (xhr.status) {
                case 200: // OK
                    // If pool is not empty
                    if (response.messages.length > 0) {
                        // Create nav controls the first time
                        if (!navPagination) {
                            createPaginationControls(response);
                        }

                        updatePaginationInfo(response);
                        updateUlMessages(response);
                    }
                    else {
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

    btnGetAllMsgs.onclick = () => {
        lim = limit.value;
        fetchPool(lim, 0);
    };
}

export {
    init,
};