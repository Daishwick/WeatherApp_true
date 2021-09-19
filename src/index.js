// const { default: axios } = require("axios");

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let currentTemperature = document.querySelector("#degrees");
  currentTemperature.innerHTML = temperature;
}

function click(event) {
  let searchinput = document.querySelector("#searchbar").value;
  let cityname = document.querySelector("#City-name");
  cityname.innerHTML = searchinput;
  console.log("city", searchinput);
  fetchTemp(searchinput);
}

function fetchTemp(cityname) {
  let units = "metric";
  let apiKey = "1887250fbd68c3f9205830915ce15b04";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=${units}&appid=${apiKey}`;
  console.log("Url", apiUrl);
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
  axios.get(`${currentPosition}`).then(getTemperature);
}

function getTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let currentTemperature = document.querySelector("#degrees");
  let currentPosition = document.querySelector("#City-name");
  currentPosition.innerHTML = response.data.name;
  currentTemperature.innerHTML = temperature;
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

function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  let hour = now.getHours();
  let minute = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
  let date = now.getDate();
  return `${day},</br> ${date}-${month}-${year}, ${hour}:${minute}`;
}

let currentinfo = document.querySelector("#currentinfo");
currentinfo.innerHTML = formatDate(new Date());
