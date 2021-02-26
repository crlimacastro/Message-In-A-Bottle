import * as ajax from '../ajax.js';

const init = () => {
    // DOM Elements
    const inputTopic = document.querySelector("#inputTopic");
    const btnGetMessage = document.querySelector("#btnGetMessage");
    const btnGetReceivedMsgs = document.querySelector("#btnGetReceivedMsgs");
    const pMessage = document.querySelector("#pMessage");
    const ulMessages = document.querySelector("#ulMessages");
    const pFeedback = document.querySelector("#pFeedback");

    /** Updates ul element with fetched response data */
    const updateUlMessages = (response) => {
        ulMessages.innerHTML = ''; // Clear ul 
        const messages = Object.values(response);

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

    btnGetMessage.onclick = () => {
        ajax.sendGETRequest(`/msg-random?topic=${inputTopic.value}`, e => {
            const xhr = e.target;

            switch (xhr.status) {
                case 200: // OK
                    const response = JSON.parse(xhr.response);
                    pMessage.innerHTML = response.message;
                    break;
                case 204: // No Content
                    if (inputTopic.value === '') {
                        pFeedback.innerHTML = 'There are currently no messages out at sea. Check back later or write your own.';
                    }
                    else {
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
        ajax.sendGETRequest('/msg-received', e => {
            const xhr = e.target;

            switch (xhr.status) {
                case 200: // OK
                    const response = JSON.parse(xhr.response);
                    const messages = Object.values(response);

                    // If pool is not empty
                    if (messages.length > 0) {
                        updateUlMessages(response);
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