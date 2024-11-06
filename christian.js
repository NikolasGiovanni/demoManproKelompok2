const APIKEY = "60bd31d2f85de21ee697ca57506dcf25";

async function searchBtnClick() {
  const inputSearch = document.querySelector(".input-search");
  const city = inputSearch.value;
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${APIKEY}`;

  try {
    const data = await fetch(api)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    changeInformation(data);
  } catch (error) {
    console.log(error);
  }
}

function changeInformation(data) {
  console.log(data);
  const weather = data.weather[0].main.toLowerCase();
  const temp = data.main.temp;
  const tempRounded = Math.round(temp * 10) / 10;
  const city = data.name;
  const humidity = data.main.humidity;
  const wind = data.wind.speed;

  const imgWeather = document.querySelector(".image-weather");
  imgWeather.src = `weather-app-img/images/${weather}.png`;

  const tempText = document.querySelector(".temp-text");
  tempText.innerHTML = tempRounded + "&degc";

  const cityText = document.querySelector(".city-text");
  cityText.textContent = city;

  const humidityLevel = document.querySelector(".humidity-level");
  humidityLevel.textContent = humidity + "%";

  const windLevel = document.querySelector(".wind-level");
  windLevel.textContent = wind + " km/h";
}

const searchBtn = document.querySelector(".search-icon");
searchBtn.addEventListener("click", searchBtnClick);
