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
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  // this opens the request and now we have to send it
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  // to send the request
  request.send();
  // In order to save the data from result we cannot just store in a variable because it is not available yet(it is an AJAX call and runs in background). Instead, we need to register a callback on the request object for the load event.
  // As soon as data arrives in 'load' event the callback function will execute. We can just log it in the console. The 'this' keyword refers to the request, we could just write 'request'(console.log(request.responseText))) if we wanted. The value of the response is saved in the property responseText.
  request.addEventListener('load', function () {
    console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
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
  });
};
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
getCountryData('usa');
getCountryData('israel');
getCountryData('thailand');
