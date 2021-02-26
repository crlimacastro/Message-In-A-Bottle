import * as ajax from '../ajax.js';

const init = () => {
    // DOM Elements
    // Controls
    const formWrite = document.querySelector('#formWrite');
    const inputMessage = document.querySelector('#inputMessage');
    const inputTopic = document.querySelector('#inputTopic');
    // Output
    const pFeedback = document.querySelector('#pFeedback');

    formWrite.onsubmit = (e) => {
        ajax.sendFormRequest(e, (e) => {
            const xhr = e.target;
            const response = JSON.parse(xhr.response);

            switch (xhr.status) {
                case 201: // Created
                    // Clear inputs
                    inputMessage.value = '';
                    inputTopic.value = '';
                    
                    pFeedback.innerHTML = response.message;
                    break;
                case 400: // Bad Request
                    pFeedback.innerHTML = response.message;
                    break;
                case 405: // Method Not Allowed
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