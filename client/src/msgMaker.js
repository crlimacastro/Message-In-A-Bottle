import * as ajax from './ajax.js';

const deleteMsg = (msg, outputElement) => {
  ajax.sendDELETERequest(`/pool-delete?id=${msg.id}`, (e) => {
    const xhr = e.target;
    const response = JSON.parse(xhr.response);

    switch (xhr.status) {
      case 200: // OK
        outputElement.innerHTML = response.message;
        break;
      case 405: // Method Not Allowed
        outputElement.innerHTML = response.message;
        break;
      default:
        outputElement.innerHTML = 'Status Code not handled by client';
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
  // Create DOM Elements
  const lblMessage = document.createElement('label');
  lblMessage.innerHTML = 'Message: ';
  const pMessage = document.createElement('p');
  pMessage.innerHTML = msg.message;
  const divMessage = document.createElement('div');
  const lblTopic = document.createElement('label');
  lblTopic.innerHTML = 'Topic: ';
  const pTopic = document.createElement('p');
  pTopic.innerHTML = msg.topic ? msg.topic : 'none';
  const divTopic = document.createElement('div');
  const lblCreatedOn = document.createElement('label');
  lblCreatedOn.innerHTML = 'Created on: ';
  const pCreatedOn = document.createElement('p');
  pCreatedOn.innerHTML = new Date(msg.created_at).toGMTString();
  const divCreatedOn = document.createElement('div');
  const divMsg = document.createElement('div');
  divMsg.classList.add('message');

  // Update the DOM
  divMessage.appendChild(lblMessage);
  divMessage.appendChild(pMessage);
  divMsg.appendChild(divMessage);
  divTopic.appendChild(lblTopic);
  divTopic.appendChild(pTopic);
  divMsg.appendChild(divTopic);
  divCreatedOn.appendChild(lblCreatedOn);
  divCreatedOn.appendChild(pCreatedOn);
  divMsg.appendChild(divCreatedOn);

  return divMsg;
};

// Makes & returns DOM msg with full information and delete button
const makeMsgAdmin = (msg, outputElement) => {
  // Create DOM Elements
  const lblID = document.createElement('label');
  lblID.innerHTML = 'ID: ';
  const pID = document.createElement('p');
  pID.innerHTML = msg.id;
  const divID = document.createElement('div');
  const lblMessage = document.createElement('label');
  lblMessage.innerHTML = 'Message: ';
  const pMessage = document.createElement('p');
  pMessage.innerHTML = msg.message;
  const divMessage = document.createElement('div');
  const lblTopic = document.createElement('label');
  lblTopic.innerHTML = 'Topic: ';
  const pTopic = document.createElement('p');
  pTopic.innerHTML = msg.topic ? msg.topic : 'none';
  const divTopic = document.createElement('div');
  const lblCreatedOn = document.createElement('label');
  lblCreatedOn.innerHTML = 'Created on: ';
  const pCreatedOn = document.createElement('p');
  pCreatedOn.innerHTML = new Date(msg.created_at).toGMTString();
  const divCreatedOn = document.createElement('div');
  const divMsg = document.createElement('div');
  divMsg.classList.add('message');
  const btnDelete = document.createElement('button');
  btnDelete.innerHTML = 'Delete';
  btnDelete.onclick = () => {
    deleteMsg(msg, outputElement); // Delete server msg
    divMsg.remove(); // Delete DOM msg
  };

  // Update the DOM
  divID.appendChild(lblID);
  divID.appendChild(pID);
  divMsg.appendChild(divID);
  divMessage.appendChild(lblMessage);
  divMessage.appendChild(pMessage);
  divMsg.appendChild(divMessage);
  divTopic.appendChild(lblTopic);
  divTopic.appendChild(pTopic);
  divMsg.appendChild(divTopic);
  divCreatedOn.appendChild(lblCreatedOn);
  divCreatedOn.appendChild(pCreatedOn);
  divMsg.appendChild(divCreatedOn);
  divMsg.appendChild(btnDelete);

  return divMsg;
};

export {
  makeMsgLite,
  makeMsg,
  makeMsgAdmin,
};
