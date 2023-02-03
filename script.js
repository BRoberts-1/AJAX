'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Section 246 - Asynchronous JavaScript, AJAX, and APIs

// Most popular use cases are making AJAX calls to APIs

// Synchronous code is code executed line by line in the exact order it is written in the file. I.E. it is exectued in the execution thread in the execution context(how code is executed in the CPU)

// All lines get executed in order, and one line has to finish before another line of code begins to get executed. E.g. an alert window will execute, but then it blocks the execution of the rest of the code until user clicks 'ok'. Long running operations block execution of code.

// Example of asynchronous code would be the setTimeout function, which executes a piece of code after a certain amount of time. It is non-blocking and allows other code to be executed in the meantime.It then executes a callback function after a specified amount of time.

// So, setTimeout() executes after a task that runs in the 'background' is finished. An action is deferred into the future without blocking the execution of other code.

// Asynchronous literally means not occuring at the same time.

// Callback functions alone do not make the code asynchronous. e.g. map function have a callback function, but are not asynchronous.

// EventListeners, also, do not make the code asynchronous. It is not doing anything in the background.

// Img loading in JS IS asynchronous because it takes time for the image to load. Another example of asynchronous code would be the Geolocation API we used and AJAX.

// AJAX stands for Asynchronous JavaSCript And XML - It allows us to communicate with remote servers in an aynchronous way. With AJAX calls, we can request data from web servers dynamically.

// API - Application Programming Interface - a piece of software that can be used by another piece of software, in order to allow applications to interact. e.g. DOM API, Geolocation API, a class API. Any self contained code(ie encapsulated) that can be used by another self-contained piece of code.

// Online API (aka Web API or simply API)- Application running on a server that receives request for data, and then sends back data, as a response.

// We can build our own web APIs(need to know back-end development eg. Node.js, Django, etc) or you can use 3rd-party APIs developed and maintained by someone else. There are APIs for everything e.g. currency conversion, embedding google maps, data about countries, sending email or SMS etc. It made modern web developemnt possible.

// XML - A data format that used to be used to transmit data on the web. These days it is not used as much, instead JSON data format is primarily used.

// JSON has the same syntax as a JS object literally and is just converted to a string to send data across the web.
