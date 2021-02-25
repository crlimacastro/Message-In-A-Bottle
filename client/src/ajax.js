const sendGETRequest = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = callback;
    xhr.send();
};

const sendFormRequest = (e, callback) => {
    e.preventDefault(); // 'hijack' form by stopping its previous submit event

    const form = e.target;
    const action = form.getAttribute('action'); // Endpoint form calls
    const method = form.getAttribute('method'); // Request Method

    // Get all data in form
    const keyValuePairs = [];
    for (const element of form.elements) {
        const key = encodeURIComponent(element.name);
        const value = encodeURIComponent(element.value);
        keyValuePairs.push(`${key}=${value}`);
    }
    const data = keyValuePairs.join('&');

    const xhr = new XMLHttpRequest();
    xhr.open(method, action);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = callback;
    xhr.send(data);

    return false;
};

export {
    sendGETRequest,
    sendFormRequest,
};