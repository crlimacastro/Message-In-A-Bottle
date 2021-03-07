<h1 id="top">Message in a Bottle</h1>

Web app &amp; API to send anonymous messages received by random recipients.

[See Documentation](https://github.com/crlimacastro/crl3554-430-project-1/blob/main/documentation.md)

## Index

[Purpose of the site](#Purpose-of-the-site)

[What went right &amp; what went wrong](#What-went-right-&amp;-what-went-wrong)

[Future improvements](#Future-improvements)

[Above and beyond](#Above-and-beyond)

[Sources](#Sources)

## Purpose of the site

Message in a Bottle is an anonymous messaging system where users can write something and submit it to the server. Your message can then be retrieved randomly by someone. The messages contain no information about the sender or the receiver so both parties never know each other. The site is an hub/interface to use the underlying features of the API through a user-friendly UI.

The API includes features such as writing out messages to the pool, retrieving random messages, and viewing the messages you have received. You can also use some admin functionalities such as deleting messages or clearing out the message pool.

[Back to Top](#top)

## What went right &amp; what went wrong

Making the system for automatically reading the folder structure and making the endpoints was a real timesaver. It allowed me to focus more on the API and making it more robust. It was a double edged sword, however, as it drove me to want to automate my utility scripts as well.

I wanted to be able import all of the files' exports in a utility folder into a single .js file that I could then require() through Node. I got it working in the end but it came at a heavy price. Not only did it take me a lot of time to figure out how to do such a thing and debug it, but I lost a lot of useful functionality such as intellisense when using my utility scripts. Because files weren't being imported regularly through require() anymore intellisense couldn't find the functions being exported and could not help me anymore, even though the functions were all working. Even worse, eslint didn't check those files for errors as they were considered not to be imported because of the dynamic way I was importing them.

In the end, I scrapped the whole system and it cost me a lot of wasted time. It was simply causing too many problems so I resorted to regular require() importing. I left the script in because it was a fun puzzle to figure out (how to import all helper methods in a folder structure automatically) and I might come back to it in the future to find a way to fix the problems it was causing and make it work 100% right.

[Back to Top](#top)

## Future improvements

Server Storage - the most obvious improvement would be to store the message pools in an external, persistent server storage so that messages are saved between server reloads.

Add more functionality and controls over saved information and how it is displayed (different sorting methods, for example).

Most Popular Topics - I would add a feature to the API and the app screen (where the user fetches random messages) that would show the most popular topics that people write about. As a suggestion of what to look for.

Profanity Filtering - This would probably have to be brought in as an external dependency but I would like to add a filter that would not allow people to submit profanities or hateful messages to the server, to keep it as clean as possible.

[Back to Top](#top)

## Above and beyond

Automation of Endpoints - As suggested, I created a basic endpoint making system that automatically looks at the folder structure of the "client" folder and creates all the necessary endpoints for me (instead of having to make one manually for every single file). This sped up development immensely and allowed me to organized and separate concerns in my code better; as I wasn't making extra work for myself when separating my functionalities into different files.

Responsive Web Design - The site is styled to work well on both computer and phone screens.

[Back to Top](#top)

## Sources

Favicon - https://www.flaticon.com/free-icon/message-in-a-bottle_3142421

Quill and ink - https://www.flaticon.com/free-icon/quill-pen_4150743?related_id=4150743&origin=search

### Code

https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js

Function for recursively reading all files in a directory and all subdirectories (used for automatic endpoint maker).

https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838

Function to get the size (in bytes) of a string. To send the size of files in HEAD requests.

https://www.semicolonworld.com/question/44499/how-to-determine-a-user-39-s-ip-address-in-node

How to get a request sender's IP address. Used to save the users so they can view their saved messages without having to create accounts (keeping the intended anonymity of the service). Internally, users are saved by UUID's with a hashing table saved elsewhere to convert a user's IP into their ID and vice versa.

### Dependencies

mime - https://github.com/broofa/mime - used to determine mimetype of a file.

uuid - https://github.com/uuidjs/uuid - used to generate random UUID's for users and API responses.

[Back to Top](#top)