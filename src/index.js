let now = new Date();

let currentDate = document.querySelector("#currentDate");
let currentDayAndTime = document.querySelector("#currentDayTime");
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let year = now.getFullYear();

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

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Decemeber",
];

let month = months[now.getMonth()];

currentDate.innerHTML = `${date}/${month}/${year}`;
currentDayAndTime.innerHTML = `${day} | ${hour}:${minute}`;

function showTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let tempNumber = document.querySelector(".tempNumber");
  let temperatureRounded = Math.round(response.data.main.temp);
  tempNumber.innerHTML = `${temperatureRounded}°`;
  let description = document.querySelector(".left2");
  let displayDesc = response.data.weather[0].description;
  description.innerHTML = `${displayDesc}`;
  let humidity = document.querySelector(".percentage");
  let displayHumidity = response.data.main.humidity;
  humidity.innerHTML = `${displayHumidity}`;
  let windSpeed = document.querySelector(".mph");
  let displayWind = response.data.wind.speed;
  windSpeed.innerHTML = `${displayWind}`;
}

function searchCity(city) {
  let apiKey = "efb771bfb7ce128cb70f69f945fe6a81";
  let apiFront = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiFront}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  if (cityInput.value) {
    cityElement.innerHTML = `${cityInput.value}`;
    searchCity(cityInput.value);
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function displayPosition(position) {
  let apiKey = "efb771bfb7ce128cb70f69f945fe6a81";
  let apiFront = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `${apiFront}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(displayPosition);
}

let button = document.querySelector("#current-btn");
button.addEventListener("click", getCurrentPosition);
