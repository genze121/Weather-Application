const apiKey = "5cf224ff3f0dbca0ab7e5dd38f736938";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherImage = document.querySelector(".weather-icon");
const inputBox = document.querySelector(".input");

document.querySelector(".error").style.display = "none";
document.querySelector(".weather").style.display = "none";

async function checkWeather(city) {
  if (city === "" && city.length === 0) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
    return;
  }
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status === 404 || response.status === undefined) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "&deg" + "c";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

    loadIconOnDisplay(data);

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

function loadIconOnDisplay(data) {
  if (data.weather[0].main === "Clouds") {
    weatherImage.src = "images/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weatherImage.src = "images/clear.png";
  } else if (data.weather[0].main === "Mist") {
    weatherImage.src = "images/mist.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherImage.src = "images/drizzle.png";
  } else if (data.weather[0].main === "Humidity") {
    weatherImage.src = "images/humidity.png";
  } else if (data.weather[0].main === "Snow") {
    weatherImage.src = "images/snow.png";
  } else if (data.weather[0].main === "Rain") {
    weatherImage.src = "images/rain.png";
  } else if (data.weather[0].main === "Wind") {
    weatherImage.src = "images/wind.png";
  }
}

function checkInput() {
  if (inputBox.value.length === 0) {
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "none";
  }
}

function enterKey(event) {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
}