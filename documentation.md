<h1 id="top">Message in a Bottle API - Documentation</h1>

A REST API to write & store(as well as retrieve) random messages from anonymous users around the world.

[Endpoints](#Endpoints)

[Responses](#Responses)

[Status Codes](#Status-Codes)

[Errors](#Errors)

## Endpoints

The following are the functional endpoints of the API. Wherever it may be hosted, these will all be the same and provide the same functionality.

### GET

* /msg-random?topic=string

Retrieve a random message from the server pool and save it. Specify a topic to search for messages with that tag only.

Query Parameters:

topic (optional): filtering tag to ensure you receive only messages of this topic.

* /msg-received?limit=number&page=number

Returns a page of the messages you have received in the past.

Query Parameters:

limit (optional): How many messages to get per page.

page (optional): Index (starting from 0) of the page you with to get.

* /pool?limit=number&page=number

Admin endpoint that returns a page of the messages in the public pool.

Query Parameters:

limit (optional): How many messages to get per page.

page (optional): Index (starting from 0) of the page you with to get.

### POST

* /write-msg

Stores a message in the server.

Body Parameters:

message (string): Text content of the message.

topic (optional, string): Topic or tag for the message.

### DELETE

* /pool-delete?id=string

Admin endpoint that deletes a message from the server.

Query Parameters:

id: identifier of the message to delete.

* /pool-clear

Admin endpoint that removes all data stored in the server.

[Back to Top](#top)

## Responses

### MessageResponse

```javascript
{
    created_at: Date,        // Date and time it was created
    updated_at: Date,        // Last time it was updated
    hostname: String,        // Identifier of the host service
    id: String,              // Randomly generated ID
    type: 'MessageResponse', // Type of response, to identify through code
    message: String,         // (MAIN CONTENT) Text content of the message
    topic: String,           // (SECONDARY CONTENT) Topic tag of message
    received: Boolean,       // Whether message was received
    received_at: Date,       // Date and time message was received
}
```

### APIJSONResponses

```javascript
{
    created_at: Date,        // Date and time it was created
    updated_at: Date,        // Last time it was updated
    hostname: String,        // Identifier of the host service
    id: String,              // Randomly generated ID
    type: String,            // Type of response, to identify through code
}
```

### APIError

```javascript
{
    id: String,               // Type of error, to identify through code
    message: String,          // Short human-readable explanation of error
    url: String,              // Url to documentation explanation of error
}
```

[Back to Top](#top)

## Status Codes

These are the possible status code that the API may send, where it sends them, and why.

### 200 - OK

* /msg-random - Always responds OK with some sort of feedback (either your message content or an API response).

* /msg-received - Always responds OK with some sort of feedback (either your page content or an API response).

* /pool - Always responds OK with your message page content.

* /pool-delete - Responds OK on a successful deletion with an API response.

* /pool-clear - Responds OK on a successful clear with an API response.

### 201 - Created

* /write-msg - Responds CREATED when your message is successfully saved to the server.

### 400 - Bad Request

* /write-msg - Responds Bad Request when the message parameter is missing and when any error occurs while parsing the body.

* /pool-delete - Responds Bad Request when an ID is not specified in the query parameters.

### 404 - Not Found

* /pool-delete - Responds Not Found when there is no message with the ID specified.

### 405 - Method Not Allowed

* /write-msg - Responds Method Not Allowed when using any other method than POST for this endpoint.

* /pool-delete - Responds Method Not Allowed when using any other method than DELETE for this endpoint.

* /pool-clear - Responds Method Not Allowed when using any other method than DELETE for this endpoint.

[Back to Top](#top)

[Back to Responses](#Responses)

[Back to Top](#top)

## Errors

You may receive any of the following errors when working with the API.

### ParamUndefinedError

An important parameter was missing from your request's query string or body. Check that you are sending all the necessary data specified on your desired endpoint above.

### RequestMethodError

Your request was sent with the wrong HTTP method(GET/POST/DELETE/etc...). Make sure that you are sending the correct method by referencing your desired endpoint above.

[Back to Responses](#Responses)

[Back to Status Codes](#Status-Codes)

[Back to Top](#top)