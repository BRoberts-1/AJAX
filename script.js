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

// Section 248 - Our first AJAX Call: XMLHttpRequest

// We will build functionality for an app to get data about any country in the world via an online API.

// We will use the oldest way to do an AJAX call using the XMLHttpRequest function, we will store the result in a variable called 'request':

// This is how AJAX calls used to be handled with events and callback functions. Modern JS uses 'promises'.

// The type of Http request to received data is called "GET" as first arg, and then the URL to get from as 2nd arg.

// On github there is a huge repository called Public APIs - gives a list of a ton of free APIs you can use. We will use one called REST Countries. Make sure the API has CORS - stands for Cross Origin Resource sharing because without it you cannot access a 3rd party API from our own code.

// Click on the API you want and it will take you to documentation. Look for the API endpoint. An ENDPOINT is the URL that we need to get data from.
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   // this opens the request and now we have to send it
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   // to send the request
//   request.send();
// In order to save the data from result we cannot just store in a variable because it is not available yet(it is an AJAX call and runs in background). Instead, we need to register a callback on the request object for the load event.
// As soon as data arrives in 'load' event the callback function will execute. We can just log it in the console. The 'this' keyword refers to the request, we could just write 'request'(console.log(request.responseText))) if we wanted. The value of the response is saved in the property responseText.
//   request.addEventListener('load', function () {
//     console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)}</p>
//       <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//       <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//     </div>
//   </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// The data displayed in the console is JSON format(a big string of text) and needs to be converted to a JS Object to use it.
// It returns an array containing one object, so we destructure it by putting brackets around our variable name.
// Now we can build the card using HTML code by creating a template literal which we will then fill up with the requested data. Just go look at object and insert properties and values using ${} e.g. ${data.flag} for the URL of an image of the country flag.
// If data is an array, we take whatever index we need and then the property we want from that index - see above.
// Then we just have to insert our HTML into our HTML page to be displayed. We have a 'countries' element that we saved to a variable using the querySelector. So: countriesContainer.insertAdjacentHTML('beforeend', html)
// We also have to set the style of this container to opacity 1 as opacity is set to 0 in CSS file. It will then trigger an animation transition.

// We can then save all code into a function to create multiple cards for different countries at once. So we save in variable getCountryData a function that takes a string of a country as a parameter.
// We also need to change the URL of API to a string literal and put ${country} as the input we recieve as an argument from user.
// Here we can call multiple countries:
// We are doing parallel AJAX and if you reload page multiple times, you will see them appear in different order as the data arrives at different times each reload.
// getCountryData('usa');
// getCountryData('israel');
// getCountryData('thailand');

// Section 249 - How the Web Works: Request and Responses

// Request-response model(aka Client-server architecture) is where a client(ie computer using a browser) requests data from a web server(remote computer storing web pages/data) and then receives a response in data.

// Client - every URL has a protocol - either HTTP or HTTPS, a domain name eg. google.com, and then a resource eg. search. The domain name is just an easy string for us to remember because the actual address is harder to memorize.
// Step 1 - DNS - domain name server(special type of server like the phonebook of the internet) stores the addresses of the actual domain names. When a request is made, the first thing that happens to client is the domain is mateched with its actual numeric address(it actually all happens through your ISP - internet service provider)
// So the domain name is converted by the DNS to the 'real' address. After it is sent back to the client, it can then actually be called. So it returns: https://104.27.142.889:443 The 443 is the port number. The default port for HTTPS is 443, default port for HTTP is 80. The port number just identifies a specific service running on a server(like a sub-address within the server)

// Step 2 - a TCP/IP socket connection is made to connect client with server and continues until all files/data is transferred. TCP - Transmission Control Protocol. IP - Internet Protocol. Together they are communication protocols that define exactly how data travels across the web. The internets fundamental control system.

// Step 3 - HTTP Request - HyperText Transfer Protocol - an actual request is then made to the remote server. It is another communication protocol( a system of rules that allows 2 or more parties to communicate)

// An HTTP message looks like this:
// GET /rest/v2/alpha/PT HTTP/1.1 -this is the start line and is the most important part. It contains: HTTP method eg GET, the request target eg /rest/v2/alpha/PT, and the HTTP version eg HTTP/1.1.

// HTTP methods include: GET - to receive data, POST - to send data, and PUT/PATCH - to modify data.

// The request target is the resource we want to access in our request. If the target was empty ie just a / then we would be accessing the website's root folder.

// The next part of the HTTP requests are the headers - just information about the request itself eg. HOST: www.google.com, User-Agent: Mozilla/5.0, and Accept-Language: en-US. There are tons of standard difffernt headers.

// Request body is only needed when sending data to server eg with POST method.

// All of these are done by the browser and not the developer.

// The difference between HTTP and HTTPS is HTTPS is encrypted using TLS or SSL(ie security protocols)

// Step 3 - After our request hits the server, it is processed and then it sends back an HTTP RESPONSE. The HTTP response looks similar to the request with a start line, headers, and a body. The start line has the version: HTTP/1.1, the status code-200, and the status message - OK. The status code and message let the client know whether the request was successful or failed. eg. 404 - Page not found. Response headers are info. about the response itself eg: Date: Fri, 18 Jan 2021, Content-Type: text/html, Transfer-Encoding: chucked
// Last part is response body which is present in most responses.(it contains the JSON data we requested or the HTML etc.)

// With a web API - it is only one request and one response, but with a web page, there are many requests and many responses. This occurs because the browser has to ask for every file aka asset to build the page eg. HTML, CSS, and JS file etc. When all the files have finally arrived, then the page is rendered.

// The job of TCP protocol is to break the requests and responses down into thousands of small chunks called packets and then reassemble them once they reach the destination. This is necessary so that each packet can take a different route through the web to reach its destination the fastest. (Big chunks cause traffic jams.)

// The job of the IP protocol is to send and route the packets of data through the internet and ensure they arrive at their destinations using IP addresses assigned to each packet of data.

////////////////////////////////////////////
// Section 250 - Welcome to Callback Hell

// Parellel AJAX calls we done in last section, now we will create a sequence of AJAX calls.

// We will call of country function to get the countrie's data. Then, we will use that data from returned object to get the bordering country of said country. Then we call the country function on that bordering country, so that one is dependent on another.

// We rename the function getCountryAndNeighbor()
// We put the HTML part of the function into it's own function.
// We then call the renderCountry() inside of our getCountryAndNeighbor() function, and then call our getCountryAndNeighbor

// const renderCountry = function (data, className = '') {
//   const html = `
//   <article class="country ${className}">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)}</p>
//       <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//       <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//     </div>
//   </article>`;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const getCountryAndNeighbor = function (country) {
//   // AJAX call country #1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // To render our country #1
//     renderCountry(data);

//     // To get our neighboring country #2
//     // We will use 'optional chaining' to account for countries that have no 'borders' property.
//     // Some countries have more than one border, so we will select the first border in our object array.
//     const [neighbor] = data.borders;

//     // guard clause in case country has no neighbors
//     if (!neighbor) return;
//     // then we do AJAX call #2, we must change our API URL(option 'alpha' instead of 'name') call to use the country code instead to get our data, check documentation for other options available.

//     // we are firiing off the #2 AJAX call in the callback function of the #1 AJAX call.( a callback inside of a callback = the road to callback hell)
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
//     request2.send();
//     // must add an eventhandler for 'load' event
//     request2.addEventListener('load', function () {
//       // console.log(this.responseText);
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbor');
//     });
//   });
// };

// getCountryAndNeighbor('israel');

// // Here we have a callback nested within a callback because of AJAX calls. If we wanted to display more neighboring countries' cards, then it would be become even more deeply nested and THAT is called 'callback hell'. Any asynchronous call with a callback function will put us in callback hell. You can tell from the trianglular shape it is callback hell. Callback hell is hard to read, understand, maintain. Therefore, it will have more bugs and is just not called 'good code' EG:
// setTimeout(() => {
//   console.log('1 second has passed');
//   setTimeout(() => {
//     console.log('2 seconds has passed.');
//     setTimeout(() => {
//       console.log('3 seconds has passed.');
//       setTimeout(() => {
//         console.log('4 seconds has passed.');
//         setTimeout(() => {
//           console.log('5 seconds has passed.');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Section 251 - Promises and the Fetch APi

// We will replace the XMLHttp Request with the modern way of making AJAX calls which is using fetch API and promises.

// The old way:

// const request = new XMLHttpRequest();
// request.open('GET', 'https://restcountries.com/v2/name/israel');
// request.send();

// The modern ES6(2015) way:

// const request = fetch('https://restcountries.com/v2/name/israel');
// console.log(request);
// all we need is the URL(endpoint), we could use an object with more options as the 2nd arg if we need something more complex.

// Promise - An object that is used as a placeholder for the future result of an aynchronous operation.
// It is like a container for an aynchronously delivered value.(A container for a future value i.e. a response from an AJAX call.) A similar thing would be a lottery ticket - buying a ticket(promise), lottery(async task) happens asynchronously(don't have to stop everything until the result), if correct outcome(we picked correct numbers), then money is received as promised. If we did not guess correctly, then we get rejected(an error occured)

// Why to use promises?:

//-We no longer have to rely on events and callbacks passed into asynchronous function to handle asynchronous results.
//-Instead of nesting callbacks, we can chain promises for a sequesnce of aynchronous operations, escaping callback hell.

// Promises are time-sensitive, ie they change over time, and can therefore be in different states. These changes are called the 'lifecycle' of promises.

// Pending - before the future value is available. The async task is still working in background.

// Settled - After the async task has finised, we say that the promise is 'settled'. Two types - Fufilled and Rejected.

// Fufilled - The value is available as we expected.
// Rejected - An error occured during async task as the value is not available.

// We must handle these different states if fulfilled or if rejected. A promise is only settled once, and then remains that way. You have to then send another promise.

// When we use a promise to get a result we 'consume' a a promise. I.e. we consume a promise when we already have a promise e.g. promise returned from Fetch API.

// The Fetch API 'builds' promise and returns it for us to 'consume'. In this case, we don't have to build the promise ourselves in order to consume it. It does it automatically. Most of the time we just consume promises and don't have to build them, but we will learn to do both.

// Section 252 - Consuming Promises

// We will learn how to consume a promise.

// const request = fetch('https://restcountries.com/v2/name/israel');
// console.log(request);

// Fetch() returns a promise, in order to handle the fulfilled state, we can then use the .then() method that is available on all promises. SEE BELOW.

// Then, in order to 'read the data from the body of the object' we need to change our response into usable data, we can call the .json() method, which is available on all response object coming from the fetch API. The .json() method is an async function itself and will return a  promise, so we are nesting promises. So we must return the .json promise and then, we then handle it with the .then() method. SEE BELOW.

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCounry(data[0]);
//     });
// };
// getCountryData('israel');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
// getCountryData('israel');

// We can simplify the above code by taking out the console.log() and using arrow functions, making it more readable(ie understandable):
// It has to come after our second .then() callback function, so we modify:

const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];

      if (!neighbor) return;

      // Country 2
      // We need to return the promise and then chain another .then() method on to last .then() method.
      // The .then() method ALWAYS returns a 'promise' whether we return a value or not. But, if you specify a return value, then that return  value becomes the fullfillment value.
      // In summary, you have to handle the succes value of every promise you fetch.
      return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
    })
    .then(response => response.json())
    // 2nd arg is CSS class of 'neighbor'
    .then(data => renderCountry(data, 'neighbor'));
};
// calling function
getCountryData('thailand');

// Promises don't do away with callback functions, but they do take you out of callback hell.

// Section 253 - Chaining Promises

// We will put multiple async calls in sequence(like above section, but more. SEE ABOVE.
// Instead of a nested callback hell, we can have a 'flat chain' of promises chained together to achieve the same.
// Beginners often put the .then() method in the wrong place(ie directly after the return promise), and by doing so, create callback hell. Remember to put the .then() outside the first returned promise to avoid this situation.
