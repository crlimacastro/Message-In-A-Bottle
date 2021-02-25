import * as ajax from '../ajax.js';

const init = () => {
    const btnGetMessage = document.querySelector("#btnGetMessage");
    const pMessage = document.querySelector("#pMessage");
    const pFeedback = document.querySelector("#pFeedback");

    btnGetMessage.onclick = () => {
        ajax.sendGETRequest('/random-msg', (e) => {
            const xhr = e.target;

            switch (xhr.status) {
                case 200: // OK
                    const response = JSON.parse(xhr.response);
                    pMessage.innerHTML = response.message;
                    break;
                case 204: // No Content
                    pFeedback.innerHTML = 'There are currently no messages out at sea. Check back later or write your own.';
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