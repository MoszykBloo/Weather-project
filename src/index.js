//muestra el dia actual
let rightnow = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[rightnow.getDay()];

let showToday = document.querySelector("#now-day");
showToday.innerHTML = `${day}`;

//muestra hora actual
/*let showCurrentTime = document.querySelector("#current-time");
showCurrentTime.innerHTML = `${rightnow.getHours()}:${rightnow.getMinutes()}`;*/

function currentTime(clickingTime) {
  if (typeof clickingTime.getDay === "undefined") {
    clickingTime = rightnow;
  }

  let showCurrentTime = document.querySelector("#current-time");
  showCurrentTime.innerHTML = `${clickingTime.getHours()}:${clickingTime.getMinutes()}:${clickingTime.getSeconds()}`;
  console.log(
    `the time is ${clickingTime.getHours()}:${clickingTime.getMinutes()}:${clickingTime.getSeconds()}`
  );
}

let currentButtonTime = document.querySelector("#current-button");
currentButtonTime.addEventListener("click", currentTime);

//funcion para cambiar la ciudad
function searchCity(event) {
  event.preventDefault();
  let changedCity = document.querySelector("#city");
  getByCity(changedCity.value);
}
let changeCity = document.querySelector("#buttonSearch");
changeCity.addEventListener("click", searchCity);

//funcion para convercion de grados
/*function convertDegrees(degrees) {
  let currentDegrees = document.querySelector("#current-degrees");
  let currentType = document.querySelector("#hidden-degrees");
  if (degrees === "c" && currentType.value !== "c") {
    currentDegrees.innerHTML = (currentDegrees.innerHTML - 32) * (5 / 9);
    currentType.value = "c";
  }
  if (degrees === "f" && currentType.value !== "f") {
    currentDegrees.innerHTML = currentDegrees.innerHTML * (9 / 5) + 32;
    currentType.value = "f";
  }
}

let celcius = document.querySelector("#celcius-degrees");
celcius.addEventListener("click", function () {
  convertDegrees("c");
});
let farenheit = document.querySelector("#farenheit-degrees");
farenheit.addEventListener("click", function () {
  convertDegrees("f");
});
*/

//funcion que da temperatura real de hoy
let apiKey = "3e43755f9b9e49aaa25fe2da226ada2b";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

function showTemperature(response) {
  console.log(response);
  console.log(response.data.name);
  let temperature = Math.round(response.data.main.temp);
  let tempMin = Math.round(response.data.main.temp_min);
  let tempMax = Math.round(response.data.main.temp_max);
  let newCity = response.data.name;

  let spanCurrentTemp = document.querySelector("#current-degrees");
  spanCurrentTemp.innerHTML = temperature;

  let tempMinMax = document.querySelector("p.celciusToday");
  tempMinMax.innerHTML = `Min ${tempMin} ºC <br /> Max ${tempMax} ºC`;

  let nuCity = document.querySelector("#result-city");
  nuCity.innerHTML = newCity;

  let descriptionTemp = response.data.weather[0].description;
  let description = document.querySelector("#description");
  description.innerHTML = descriptionTemp;
  console.log(descriptionTemp);
  console.log(
    `time in TEMPERATURA HOY time is ${rightnow.getHours()}:${rightnow.getMinutes()}:${rightnow.getSeconds()}`
  );
  currentTime(new Date());
  //comentario borrar
}

axios
  .get(`${apiUrl}&q=Mexico&units=metric&appid=${apiKey}`)
  .then(showTemperature);

function getByCity(city) {
  axios
    .get(`${apiUrl}q=${city}&units=metric&appid=${apiKey}`)
    .then(showTemperature);
}

//funcion que da coordenadas
function getCurrentPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log(`Lat ${latitude} & Lon${longitude}`);

  axios
    .get(
      `${apiUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    )
    .then(getCurrentTemp);
  console.log(
    `time in COORDS time is ${rightnow.getHours()}:${rightnow.getMinutes()}:${rightnow.getSeconds()}`
  );
  currentTime(new Date());
}

//funcion que da temperaura con las coordenadas
function getCurrentTemp(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let tempMin = Math.round(response.data.main.temp_min);
  let tempMax = Math.round(response.data.main.temp_max);
  console.log(
    `The temperature is ${temperature} ºC with a minimum of ${tempMin}ºC and a maximum of ${tempMax}ºC`
  );

  let currentCityName = response.data.name;
  let currentCity = document.querySelector("#result-city");
  currentCity.innerHTML = currentCityName;
  console.log(currentCityName);

  let currentTempToday = document.querySelector("#current-degrees");
  currentTempToday.innerHTML = temperature;
  console.log(`${temperature}ºC`);

  let descriptionTemp = response.data.weather[0].description;
  let description = document.querySelector("#description");
  description.innerHTML = descriptionTemp;
  console.log(descriptionTemp);

  let currentMinMax = document.querySelector("p.celciusToday");
  currentMinMax.innerHTML = `Min ${tempMin} ºC <br /> Max ${tempMax} ºC`;
  console.log(`Min ${tempMin} ºC <br /> Max ${tempMax} ºC`);
  console.log(
    `time in TEMP and COORDS time is ${rightnow.getHours()}:${rightnow.getMinutes()}:${rightnow.getSeconds()}`
  );
  currentTime(new Date());
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
});

currentTime(new Date());
console.log(
  `final time is ${rightnow.getHours()}:${rightnow.getMinutes()}:${rightnow.getSeconds()}`
);
