'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

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

// Moved renderCountry() function to top

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

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbor = data[0].borders[0];
//       const neighbor = 'blahblah';

//       if (!neighbor) return;

//       // Country 2
//       // We need to return the promise and then chain another .then() method on to last .then() method.
//       // The .then() method ALWAYS returns a 'promise' whether we return a value or not. But, if you specify a return value, then that return  value becomes the fullfillment value.
//       // In summary, you have to handle the succes value of every promise you fetch.
//       return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
//     })
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     // 2nd arg is CSS class of 'neighbor'
//     .then(data => renderCountry(data, 'neighbor'))
//     .catch(err => {
//       console.error(`$(err)🔥🔥🔥`);
//       renderError(`Something went wrong 🔥🔥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// calling function
// getCountryData('thailand');

// Promises don't do away with callback functions, but they do take you out of callback hell.

// Section 253 - Chaining Promises

// We will put multiple async calls in sequence(like above section, but more. SEE ABOVE.
// Instead of a nested callback hell, we can have a 'flat chain' of promises chained together to achieve the same.
// Beginners often put the .then() method in the wrong place(ie directly after the return promise), and by doing so, create callback hell. Remember to put the .then() outside the first returned promise to avoid this situation.

///////////////////////////////////
// Section 254 - Handing Rejected Promises

// You must handle errors ie rejected promises, it is very common for errors to occur in web development.

// An error with a promise is a rejected promise.

// The only way that the fetch() promise rejects is if the user loses his internet connection.
// We will simulate this by making the promise only handled if the user clicks a button. We have a button in the HTML, we will uncomment to turn it on. Then we will add above to our code:
// btn.addEventListener('click', function () {
//   getCountryData('israel');
// });

// To try an error, we will put in a country that does not exist.
// getCountryData('ibokistan');

// now if you click on the button - the country cards will appear, but if you take yourself offline, using the devtools, you will see an error in the console('Uncaught error in promise. Failed to fetch.)

// We must handle this rejection. There are two ways to handle the rejection:

// 1) We can pass in as an arg a 2nd callback function to deal with the rejection. We call the function with the parameter of an error itself. We handle the error by displaying the alert window. Handling the error is called 'catching' the error.

// It is a bit too much to put: err => alert(err) on every callback function or where there could be an error, so we can write code to handle errors globally. We will use .catch() method at the end of the function instead. Errors propogate down the chain until they are caught.

// We can create a function called 'renderError' that will log any errors to the console, but we also have to alert the user that there has been an error.

// Can use console.error() to print out an error message in console, instead of console.log()

// Also, can use err.message to render a message SEE ABOVE.
// The .then() method is only called when promise is fulfilled, while the .catch() method is called when there is an error.
// The .finally() method's callback function is called no matter what the outcome of the promise - either fullfilled or rejected. We use this method when something needs to happen, no matter what the result of the promise. E.g. to load a spinner while an async actions is occuring. It only works on promises, so if it is chained to another promise handling method, eg .catch() it won't work if the promise is not fulfilled.

/////////////////////////////////////////
// Section 255 - Throwing Errors Manually

// If you call for data that doesn't exist from an API, you will get a 404 error ie 'not found'.
// Use console.log to see what is the response. Remember, if you have a function block, you need to manually return the response.json();

// 200 response means 'OK', we see from our console.log() that the promise object returns with ok: false. We can use this to reject the promise manually: if(!reponse.ok) (means: if response of ok: false, then...) throw new Erro(`Country not found. (${response.status})`)

// Our created handler above, then just propagates down the chain to our .catch() and overrides what is below.

// Why do we handle errors in the first place: to display to the user there is a problem, it is just a good practice to handle them and not leave them hanging around.

// Now what if the first country argument is fine, but the 2nd country argument does not exist? There will be a rejection in the next promise. We need to have a function to handle all of these errors, but for now we can just copy paste our 'throw new Error' into our .then(response =>) function.

// Always handle errors with .catch(), and sometimes .finally()

// DRY principle - so we will make a helper function to enwrap .fetch(), error handling .catch(), and the conversion of the response to .json(). We will call this function 'getJSON'. We can set a generic error message by setting the default as 2nd arg - errorMsg = 'Something went wrong.'

// Adding a helper function for DRY principle. It will handle  the fetch,  the catch (i.e. the error), and convert to JSON.

// We will then refactor our code to take out the repeated parts to simplify.

const getJSON = function (url, errorMsg = 'Something went wrong.') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders[0];

//       if (!neighbor) throw new Error('No neighbor found!');

//       // Country 2
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbor}`,
//         'Country not found'
//       );
//     })
//     // 2nd arg is CSS class of 'neighbor'
//     .then(data => renderCountry(data, 'neighbor'))
//     .catch(err => {
//       console.error(`$(err)🔥🔥🔥`);
//       renderError(`Something went wrong 🔥🔥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });

//////////////////////////////////////
// Section 256 - Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.
Here are your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.
PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)
TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
GOOD LUCK 😀
*/

// You must catch any promise rejection

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are located in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.log(`${err.message}🔥`));
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

///////////////////////////////////
// Section 257 - Asynchronous Behind the Scenes: The Event Loop

// JavaScript Runtime: Is the 'container' which includes all the pieces necessary to execture JS code.

// Here are all the pieces:
// Heart of the runtime is the JS Engine ie the Heap(where objects are stored in memory) and the Call Stack(where code is actually executed)
// JS has only one thread that execute at a time. There is no multi-tasking execution in JS.(Java language CAN, but JS CANNOT)
// WebAPIs provided to the JS Engine e.g. DOM, Timers, FetchAPI, Geolocation API etc.
// Callback Queue holds the ready to be executed callback functions coming from event handlers. When Call Stack is empty callback functions are sent to the Call Stack to be executed.
// This whole picture is the Event Loop. The Event Loop allows for a NON-blocking concurrency model in JS. Concurrency model is how a language handles multiple tasks occuring at the same time.

// How does this NON-blocking concurrency model work? Why is it important?
// The important parts of the Event Loop are the Call Stack(Global Execution context), the Web APIs, and the Callback Queue.

// E.g loading an img into the DOM.
// el = document.querySelector('img);
// el.src = 'dog.jpg';
// el.addEventListener('load', () => {el.classList.add('fadeIn');
// });

// fetch('https: //someurl.com/api')
//  .then(res => console.log(res));

// Anything related to the DOM actually is not part of JS, but part of the Web APIs. All asynchronous tasks run in the environment of the browser, not in the main thread of JS code execution ie not in the Call Stack.

// In our example we wait for a load event and attach an event handler ie callback function to handle the event.
// That means we register the event in the Web APIs environment where it waits until the img loads.

// Then, in our example, we have an AJAX fetch call that also occurs asynchronously in the WEB API environment.(otherwise we would be blocking the Call Stack and creating a huge lag in our application.)
// Finally, in our example, we use the .then() method on the promise returned from the .fetch() method. This is also registered in the WEB APIs environment so we can react to the future resolved value of the promise.
// Once the image has finished loading, then our eventlistener callback function is put in the Callback Queue. Callback Queue is an ordered list of all the callback functions to be executed in the queue.(like a task list/to-do list that the Call Stack has to complete). Every callback has to go to the end of the line. eg. If you have a setTimeout() callback function set for 5 seconds, because it goes to the back of the line after 5 seconds, then it could take another second for it to be executed on the Call Stack as it waits its turn in line. Therefore, the timeout() function only guarantees a minimal amount of time before it executes.
// DOM events also uses the callback queue to run DOM events like 'clicks' or 'keypresses' etc.

// The Event Loop looks into the Call Stack to see if it is empty or not, except for the Global Execution context. If the Call Stack is empty, then it takes the first callback function from the Callback Queue and puts in on the Call Stack to be executed. This is called an 'Event Loop tick'. The event loop is the orchestrator of execution of the JS runtime.
// JS language has no sense of time. The asynchronous events don't happen in the JS engine, rather it just executes whatever code it is given by the event loop. All asynchronous behavior is handled by the runtime.

// Callback functions from promises do not go to the Callback Queue, rather they go to a special queue called the Microtasks Queue(these promises are referred to as 'microtasks'. There are other microtasks as well.)
// Any callbacks in Microtasks Queue have priority over any callbacks in the Callbackk Queue and are all run first by the Event Loop before the functions in the Callback Queue. Even if a microtask adds another microtask to the queue, they are all executed before the callback queue. So in theory, if microtasks keep adding, then the callback queue might never get executed(ie could be starved of execution.)

///////////////////////////////////
// Section 258 - The Event Loop in Practice

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer!'), 0);
// // A promise that is immediately resolved.
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// console.log('Test end.');

// The order which the above code executes is as follows:
// The two console.logs are synchronous code and are executed in order. Then the promise is executed because it is a microtask, and lastly the setTimeout function is executed.

// prints: Test start
//         Test end
//         Resolved promise
//         0 sec timer

// Another example:
// Even if you add another microtask promise that takes a lot of time, it will still be executed before the Callback Queue function.

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer!'), 0);
// // A promise that is immediately resolved.
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });

// console.log('Test end.');

// returns:

// Test start
// Test end.
// Resolved promise 1
// Resolved promise 2
// 0 sec timer!

// So, we cannot do high precision tasks with these callback functions because there will be delays in execution.

////////////////////////////////////////
// Section 259 - Building a Simple Promise

// We learned about consuming promises, but now we will learn how to build promises manually.
// We will simulate a lottery. A fulfilled promise is to win, and a rejected promise is to lose.
// We will use the promise constructor ie a built-in object.
// It takes one arg called the 'executor function'. It is like the fetch() function which creates a new promise as well.
// The executor function has 2 args: the resolve function and the reject functions.

// In our example we will generate a random number using the Math.random() function. Then, set a condition if this number is greater than 0.5, then the promise is fulfilled, if not, then the promise is rejected. Each is handled accordingly. At the last line we will take our object and put both .then() for a fulfilled promise and .catch() for a rejected promise ie an error.

// const lotteryPromise = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) {
//     resolve('You WIN 💲');
//   } else {
//     reject('You lost yo" money! 💩');
//   }
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// Now lets make it asynchronous by adding a setTimeout() and also a new Error object:
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening now.🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 👑');
//     } else {
//       reject(new Error('You lost yo" money! 💩'));
//     }
//   }, 2000);
// });

// // Consuming the promise
// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// // In practice, we usually only consume promises.
// // We wrap callback based functions into promises. This is called 'promisifying' ie converting asynchrous callback functions into promises. We build promises only to wrap callback based functions into them. ie callback based asynchronous behavior into promise based.

// // Promisifying setTimeout():
// // We don't need a reject function because a setTimeout will never fail to return a fulfilled promise.
// // For our callback function of setTimeout we pass in our resolve function, and because our parameter is in seconds we multiple by 1000 beause default is miliseconds.
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// // To consume this promise:
// // We will then add another promise dependent on the first, and then handle it with .then()
// // We have a chain of asynchronous behavior, without the callback hell.
// wait(2)
//   .then(() => {
//     console.log('I waited for 1 second.');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 2 seconds.');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 3 seconds.');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 4 seconds.');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 5 seconds.'));

// // There is a way to create a fulfilled or rejected promise immediately:
// // It is a static method on the promise constructor.
// // We just pass in the resolved value.
// Promise.resolve('Resolved value.').then(prom => console.log(prom));
// Promise.reject(new Error('Rejected value.')).catch(prom => console.error(prom));

//////////////////////////////////////////////////
// Section 260 - Promisifying the Geolocation API

// We will promisify a callback based API to a promise based API.
// We call it based on our own browser position and log if it is fulfilled and log if it gives an error.

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );

// We create our function to promisify, creating a new Promise object and then just paste our handler functions ie execution function arguments inside the block.
// We change our cl to resolve and reject
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)

//     // Line below is the same as above code.
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// To consume the promise.
// getPosition().then(pos => console.log(pos));

// We can use our function from the previous exercise and just change parameters to take in this getPosition value.

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are located in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message}🔥`));
// };

// btn.addEventListener('click', whereAmI);

/////////////////////////////////////////////////
// Section 261 - Coding Challange #2

/* 
Build the image loading functionality that I just showed you on the screen.
Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉
PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.
If this part is too tricky for you, just watch the first part of the solution.
PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.
TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
GOOD 
*/
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found.'));
//     });
//   });
// };

// // global variable to be assigned:
// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

//////////////////////////////////////////
// Section 262 - Consuming Promises with Async/Await

// ES2017 better way to consume promises(not build) is called Async/Await

// Just put 'async' keyword in front of function and it turns into an asynchronoous function. Put the 'await' keyword to wait for the result. Using the .fetch() function creates the promise. The 'await' keyword resolves the promise.( We 'await' until the value of the promise is returned and then assign that value to a variable we call 'res')
// Async/await is just syntactic sugar for the fetch() promises and the .then() functions to consume the results. So we also need the .json() which actually creates a new promise, so we can now just use await to handle it, and we store the result in a variable called 'data'.
// Then we just call the renderCountry function we created earlier.
// We can store the fulfilled promise value immediately into a variable without having to mess with callback functions and also no chaining.

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Our geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country.');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}🔥`);
    renderError(`🔥 ${err.message}`);

    // Reject promise returned from the async function and propagate down to see the result in our console.log()
    throw err;
  }
};
whereAmI();
// console.log('FIRST!');

// We usually use async/await along with the .then() function

/////////////////////////////////////////////
// Section 263 - Error Handling with Try...Catch
// We can't use the .catch() method that we used before because we can't attach it anywhere now. So, now we will use the try...catch statement.
// Try/catch has been around since very early with JS.

// We enwrap our code with a try {block}, trying to reassign x is impossible and gives an error. So we handle error with an alert.

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

// We will enwrap our entire function above in a try block and then catch the errors, if any occur.
// Never ignore handling errors for any promises that go unfulfilled.

/////////////////////////////////////
// Section 264 - Returning Values from Async Functions

// An async function ALWAYS returns a promise and not a value, the value is returned when the promise is fulfilled. So if you want to get the value of an async function() you must chain an .then() which receives the value once it is ready.
// so if we write: return `You are in ${dataGeo.city}, ${dataGeo.country}`; as seen above, and then want to log the results then you just write:
whereAmI()
  .then(city => console.log(`1: city`))
  .catch(err => console.log(`2: ${err.message} 🔥`))
  .finally(() => console.log(`3: Finished getting location.`));

// To 'throw' an error means to propagate the error down the chain before it gets sent directly to the catch error place.
// We add .finally() above for anthing we want to get executed, no matter what errors occur.
// The problem, however, is that now we have mixed async/await with .then() and .catch(). So, what we can do is transform above code from line 859 into async/await code by creating an async IIFE(Immediately Invoked Function Expression)
(async function () {
  try {
    const city = await whereAmI();
    console.log(`: ${city}`);
  } catch (err) {
    console.log(`2: ${err.message} 🔥`);
  }
  console.log(`3: Finished getting location.`);
});
