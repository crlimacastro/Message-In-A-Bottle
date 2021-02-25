import * as ajax from '../ajax.js';

const init = () => {
    const limit = document.querySelector("#limit");
    const btnGetAllMsgs = document.querySelector("#btnGetAllMsgs");
    const ulMessages = document.querySelector("#ulMessages");
    const navPagination = document.querySelector("#navPagination");
    const pFeedback = document.querySelector("#pFeedback");

    let currentPage = null;
    let totalPages = null;

    const updateUlMessages = (response) => {
        ulMessages.innerHTML = ''; // Clear ul 
        const messages = response.messages; // Get msg array

        for (const msg of messages) {
            const pMessage = document.createElement("p");
            pMessage.innerHTML = `Message: ${msg.message}`;
            const pCreatedAt = document.createElement("p");
            pCreatedAt.innerHTML = `Created at: ${new Date(msg.created_at).toGMTString()}`;
            const divElement = document.createElement("div");
            divElement.classList.add('message');

            divElement.appendChild(pMessage);
            divElement.appendChild(pCreatedAt);
            ulMessages.appendChild(divElement);
        }
    };

    const createPaginationControls = (response) => {
        currentPage = response.currentPage;
        totalPages = response.totalPages;

        const btnPrevious = document.createElement("button");
        btnPrevious.innerHTML = '&lt&lt Previous Page';
        btnPrevious.onclick = () => {
            if (currentPage < totalPages - 1) {
                currentPage--;
                ajax.sendGETRequest(`/pool?limit=${limit.value}&page=${currentPage}`, (e) => {
                    const xhr = e.target;
                    const response = JSON.parse(xhr.response);

                    // If pool is not empty
                    if (response.messages.length > 0) {
                        updateUlMessages(response);
                    }
                    else {
                        pFeedback.innerHTML = 'There are currently no messages in the pool';
                    }
                });
            }
        };

        const pPaging = document.createElement("p");
        pPaging.innerHTML = `${currentPage}/${totalPages}`;

        const btnNext = document.createElement("button");
        btnNext.innerHTML = 'Next Page &gt&gt';
        btnNext.onclick = () => {
            if (currentPage < totalPages - 1) {
                currentPage++;
                ajax.sendGETRequest(`/pool?limit=${limit.value}&page=${currentPage}`, (e) => {
                    const xhr = e.target;
                    const response = JSON.parse(xhr.response);

                    // If pool is not empty
                    if (response.messages.length > 0) {
                        updateUlMessages(response);
                    }
                    else {
                        pFeedback.innerHTML = 'There are currently no messages in the pool';
                    }
                });
            }
        };
    };

    btnGetAllMsgs.onclick = () => {
        ajax.sendGETRequest(`/pool?limit=${limit.value}&page=0`, (e) => {
            const xhr = e.target;
            const response = JSON.parse(xhr.response);

            switch (xhr.status) {
                case 200: // OK
                    if (!navPagination.hasChildNodes()) {
                        createPaginationControls(response);
                    }

                    // If pool is not empty
                    if (response.messages.length > 0) {
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
};

export {
    init,
};