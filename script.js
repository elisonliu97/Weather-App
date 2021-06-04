// ELEMENT SELECTORS
var userFormEl = document.querySelector('#user-form');
var cityButtonsEl = document.querySelector('#city-buttons');
var cityInputEl = document.querySelector('#city-input');
var weatherSearchTerm = document.querySelector('#weather-search-term');
var weatherContainerEl = document.querySelector('#weather-container');
var fiveDayContainerEl = document.querySelector('#five-day-container');

// VARIABLES
var apiKey = "c19e4da08eb6aeec142736a2f4693638"
var currentData
var fiveDayData
var coord

function formSubmitHandler(event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (!cityName){
        return;
    }
    getWeatherData(cityName)
}

function getWeatherData(city) {
    var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey

    fetch(weatherUrl)
        .then(function (response) {
            response.json().then(function (data) {
                currentData = data.main
                coord = data.coord
                getForecastData(coord.lat,coord.lon)
            })
        })
        .catch(function (error) {
            console.log(error);
        })


}

function getForecastData(lat, lon) {
    var fiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + apiKey
    fetch(fiveDayUrl)
        .then(function (response) {
            response.json().then(function (data) {
                fiveDayData = data.daily
            })
        })
        .catch(function (error) {
            console.log(error);
        })
}

// CREATE CARDS


userFormEl.addEventListener('submit', formSubmitHandler);
// cityButtonsEl.addEventListener('click', buttonClickHandler);