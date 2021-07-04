// ELEMENT SELECTORS
var userFormEl = document.querySelector('#user-form');
var cityButtonsEl = document.querySelector('#city-buttons');
var cityInputEl = document.querySelector('#city-input');
var weatherSearchTerm = document.querySelector('#weather-search-term');
var resultContainerEl = document.querySelector('#result-container');
var weatherContainerEl = document.querySelector('#weather-container');
var fiveDayContainerEl = document.querySelector('#five-day-container');

// VARIABLES
var iconURL = "http://openweathermap.org/img/wn/"
var apiKey = "c19e4da08eb6aeec142736a2f4693638"
var today = moment();
var currentData;
var fiveDayData;
var coord;
var cityName;

// function to handle when form is submitted
function formSubmitHandler(event) {
    event.preventDefault();

    cityName = cityInputEl.value.trim();
    // saves city name into local storage if not already in
    localStorage.setItem(cityName, cityName);
    if (!cityName) {
        return;
    }

    getWeatherData(cityName)
}

// function to display weather data
function getWeatherData(city) {
    // clear existing data
    weatherContainerEl.remove();
    fiveDayContainerEl.remove();
    // recreate divs
    weatherContainerEl = document.createElement("div")
    fiveDayContainerEl = document.createElement("div")
    fiveDayContainerEl.setAttribute('id', 'five-day-container')
    resultContainerEl.append(weatherContainerEl)
    resultContainerEl.append(fiveDayContainerEl)

    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;

    // get coordinates from api
    fetch(weatherUrl)
        .then(function (response) {
            response.json().then(function (data) {
                coord = data.coord
                getForecastData(coord.lat, coord.lon)
            })
        })
        .catch(function (error) {
            console.log(error);
        })
}

// function to get weather data
function getForecastData(lat, lon) {
    // using coordinates from last fetch, get weather data
    var fiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=minutely,hourly,alerts&appid=" + apiKey
    fetch(fiveDayUrl)
        .then(function (response) {
            response.json().then(function (data) {
                currentData = data.current;
                fiveDayData = data.daily;
                displayMainCard();
                display5day();
            })
        })
        .catch(function (error) {
            console.log(error);
        })
}

// CREATE CARDS
function displayMainCard() {
    var uvi = currentData.uvi;
    var currWeatherIcon = currentData.weather[0].icon + ".png"
    var currDate = today.format("MMM Do, YYYY")

    currWeatherEl = document.createElement('div');
    currWeatherEl.setAttribute("class", "weather-card");
    weatherContainerEl.append(currWeatherEl);

    var currHeader = document.createElement('h2')
    currHeader.setAttribute("class","weather-header")
    currHeader.textContent = cityName + " | " + currDate
    currWeatherEl.append(currHeader)

    var currIcon = document.createElement('img')
    currIcon.setAttribute("id", "weather-icon")
    currIcon.setAttribute("src", iconURL + currWeatherIcon)
    currHeader.append(currIcon)

    var currTemp = document.createElement('p')
    currTemp.textContent = "Temp: " + currentData.temp
    currWeatherEl.append(currTemp)

    var currWind = document.createElement('p')
    currWind.textContent = "Wind: " + currentData.wind_speed
    currWeatherEl.append(currWind)

    var currHumidity = document.createElement('p')
    currHumidity.textContent = "Humidity: " + currentData.humidity
    currWeatherEl.append(currHumidity)

    var currUVI = document.createElement('p')
    currUVI.textContent = "UVI: " + uvi
    if (uvi < 2) {
        currUVI.setAttribute("class", "uvi-low")
    } else if (uvi < 5) {
        currUVI.setAttribute("class", "uvi-med")
    } else {
        currUVI.setAttribute("class", "uvi-high")
    }
    currWeatherEl.append(currUVI)
}

// function to display 5 day forecast
function display5day() {
    for (var i = 1; i < 6; i++) {        
        var date = moment().add(i,'days');
        var dailyWeatherIcon = currentData.weather[0].icon + ".png"

        dailyWeatherEl = document.createElement('div');
        dailyWeatherEl.setAttribute("class", "fiveday-card");
        fiveDayContainerEl.append(dailyWeatherEl);

        var dailyHeader = document.createElement('h3');
        dailyHeader.textContent = date.format("MMM Do");
        dailyHeader.setAttribute("class", "weather-header");
        dailyWeatherEl.append(dailyHeader);

        var dailyIcon = document.createElement('img')
        dailyIcon.setAttribute("id", "weather-icon")
        dailyIcon.setAttribute("src", iconURL + dailyWeatherIcon)
        dailyHeader.append(dailyIcon)

        var dailyTemp = document.createElement('p')
        dailyTemp.textContent = "Temp: " + fiveDayData[i].temp.day
        dailyWeatherEl.append(dailyTemp)
    
        var dailyWind = document.createElement('p')
        dailyWind.textContent = "Wind: " + fiveDayData[i].wind_speed
        dailyWeatherEl.append(dailyWind)
    
        var dailyHumidity = document.createElement('p')
        dailyHumidity.textContent = "Humidity: " + fiveDayData[i].humidity
        dailyWeatherEl.append(dailyHumidity)
    }
}

// function to dynamically create buttons based on localstorage
function getSavedCities() {
    var keys = Object.keys(localStorage)
    var filtered = keys.filter((value, index, arr) => {
        return (value !== "")
    })
    for (var i = 0; i < filtered.length; i++) {
        var cityCard = document.createElement('button')
        cityCard.textContent = filtered[i]
        cityCard.setAttribute('class', 'btn')
        cityCard.setAttribute('data-city', filtered[i])
        cityButtonsEl.append(cityCard)
    }
}

// function to handle when city buttons are clicked
function buttonClickHandler(event) {
    event.preventDefault();

    cityName = event.target.getAttribute('data-city')

    getWeatherData(cityName)
}

getSavedCities();
userFormEl.addEventListener('submit', formSubmitHandler);
cityButtonsEl.addEventListener('click', buttonClickHandler);