import * as ajax from './ajax.js';

const deleteMsg = (msg) => {
  ajax.sendDELETERequest(`/pool-delete?id=${msg.id}`, (e) => {
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
};

// Makes & returns light DOM msg with just the text
const makeMsgLite = (msg) => {
  // Create DOM Elements
  const pMessage = document.createElement('p');
  pMessage.innerHTML = msg.message;
  const divMsg = document.createElement('div');
  divMsg.classList.add('message');

  // Update the DOM
  divMsg.appendChild(pMessage);

  return divMsg;
};

// Makes & returns DOM msg with some information such as received time
const makeMsg = (msg) => {
  const pMessage = document.createElement('p');
  pMessage.innerHTML = `Message: ${msg.message}`;
  const pTopic = document.createElement('p');
  pTopic.innerHTML = `Topic: ${msg.topic}`;
  const pReceivedAt = document.createElement('p');
  pReceivedAt.innerHTML = `Received on: ${new Date(msg.received_at).toGMTString()}`;
  const divMsg = document.createElement('div');
  divMsg.classList.add('message');

  // Update the DOM
  divMsg.appendChild(pMessage);
  divMsg.appendChild(pTopic);
  divMsg.appendChild(pReceivedAt);

  return divMsg;
};

// Makes & returns DOM msg with full information and delete button
const makeMsgAdmin = (msg) => {
  // Create DOM Elements
  const pID = document.createElement('p');
  pID.innerHTML = `ID: ${msg.id}`;
  const pMessage = document.createElement('p');
  pMessage.innerHTML = `Message: ${msg.message}`;
  const pTopic = document.createElement('p');
  pTopic.innerHTML = `Topic: ${msg.topic}`;
  const pCreatedAt = document.createElement('p');
  pCreatedAt.innerHTML = `Created on: ${new Date(msg.created_at).toGMTString()}`;
  const divMsg = document.createElement('div');
  divMsg.classList.add('message');
  const btnDelete = document.createElement('button');
  btnDelete.innerHTML = 'Delete';
  btnDelete.onclick = () => {
    deleteMsg(msg); // Delete server msg
    divMsg.remove(); // Delete DOM msg
  };

  // Update the DOM
  divMsg.appendChild(pID);
  divMsg.appendChild(pMessage);
  divMsg.appendChild(pTopic);
  divMsg.appendChild(pCreatedAt);
  divMsg.appendChild(btnDelete);

  return divMsg;
};

export {
  makeMsgLite,
  makeMsg,
  makeMsgAdmin,
};
