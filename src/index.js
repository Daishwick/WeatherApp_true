// const { default: axios } = require("axios");
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
  let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestampdaily) {
  let date = new Date(timestampdaily * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
 <div class="col-2">
   <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
   <img 
   src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
   alt="" 
   width="42" 
   />
   <div class="weather-forecast-temperatures">
     <span class="weather-forecast-temperature-max"> ${Math.round(
       forecastDay.temp.max
     )}° </span>
     <span class="weather-forecast-temperature-min"> ${Math.round(
       forecastDay.temp.min
     )}° </span>
   </div>
 </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1887250fbd68c3f9205830915ce15b04";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#degrees");
  let currentPosition = document.querySelector("#City-name");
  let feelslike = Math.round(response.data.main.feels_like);
  let feelslikevalue = document.querySelector("#FeelslikeTemp");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let windspeedElement = document.querySelector("#windspeed");
  let iconElement = document.querySelector("#icon");
  currentTemperature.innerHTML = temperature;
  celciusTemperature = response.data.main.temp;
  feelslikevalue.innerHTML = feelslike;
  descriptionElement.innerHTML = response.data.weather[0].description;
  currentPosition.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  windspeedElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function click(event) {
  let searchinput = document.querySelector("#searchbar").value;
  let cityname = document.querySelector("#City-name");
  cityname.innerHTML = searchinput;

  fetchTemp(searchinput);
}

function fetchTemp(cityname) {
  let units = "metric";
  let apiKey = "1887250fbd68c3f9205830915ce15b04";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=${units}&appid=${apiKey}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let searchbutton = document.querySelector("#searchbutton");
searchbutton.addEventListener("click", click);

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let unit = "metric";
  let currentPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(`${currentPosition}`).then(showTemperature);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationbutton = document.querySelector("#locationbutton");
locationbutton.addEventListener("click", getPosition);

document
  .getElementById("searchbar")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("searchbutton").click();
    }
  });

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let degreesElement = document.querySelector("#degrees");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  degreesElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celsius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searchbar");
  fetchTemp(cityInputElement.value);
}

document.addEventListener("DOMContentLoaded", function (event) {
  fetchTemp("Eindhoven");
  document.getElementById("City-name").innerHTML = "Eindhoven";
});
