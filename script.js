// ELEMENT SELECTORS
var userFormEl = document.querySelector('#user-form');
var cityButtonsEl = document.querySelector('#city-buttons');
var cityInputEl = document.querySelector('#city-input');
var weatherSearchTerm = document.querySelector('#weather-search-term');
var weatherContainerEl = document.querySelector('#weather-container');
var fiveDayContainerEl = document.querySelector('#five-day-container');

// function formSubmitHandler(event) {
//     event.preventDefault();

//     var cityName = cityInputEl.value.trim();

//     if (cityName
// }

userFormEl.addEventListener('submit', formSubmitHandler);
cityButtonsEl.addEventListener('click', buttonClickHandler);