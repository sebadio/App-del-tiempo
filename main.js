import "./style.css";

const images = {
  cloudy: "./assets/cloudy.jfif",
  scatteredClouds: "./assets/scatteredClouds.jpg",
  fewClouds: "./assets/fewClouds.jpg",
  brokenClouds: "./assets/brokenClouds.jpg",
  sunny: "./assets/sunny.jpg",
  mist: "./assets/mist.jpg",
  rain: "./assets/rain.jpg",
  snow: "./assets/snow.jpg",
  thunder: "./assets/thunder.jpg",
  clearSky: "./assets/clearSky.jpg",
};

const key = "9bc19e404c11b8ea4f09b8055e3f3cf1";
const contenedor = document.getElementById("contenedor");

const getWeather = async (input) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input}&lang=en&appid=${key}&units=metric`
  );

  const data = await response.json();

  return data;
};

const getForecast = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
  );

  const data = await response.json();

  console.log(data);

  return data;
};

const selectBgImage = async (weather) => {
  switch (weather) {
    case "Rain" || "rain":
      return images.rain;

    case "Clouds":
      return images.cloudy;

    case "Few Clouds":
      return images.fewClouds;

    case "Scattered Clouds":
      return images.scatteredClouds;

    case "Broken Clouds":
      return images.brokenClouds;

    case "Clear sky":
      return images.clearSky;

    case "Clear":
      return images.clearSky;

    case "Rain" || "rain":
      return images.rain;

    case "Thunderstorm":
      return images.thunder;

    case "Snow":
      return images.snow;

    case "Mist":
      return images.mist;

    case "Shower Rain":
      return images.rain;

    default:
      break;
  }
};

const search = async (lastSearch = undefined) => {
  const input = document.getElementById("searchBar");

  const data = await getWeather(
    lastSearch !== undefined ? lastSearch : input.value
  );

  input.value = "";
  if (data.cod === 404 || data.cod === "404") {
    document.getElementsByTagName("body")[0].innerHTML += `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <b>Error:</b> ${data.message}. If the problem persists please try again later.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      `;
    return;
  }

  const { clouds, coord, cod, wind, weather, sys, name, main } = data;

  const bgImage = await selectBgImage(weather[0].main);

  localStorage.setItem("lastSearch", name);

  contenedor.innerHTML = `
    <div class="container-fluid position-relative p-4 rounded-3 overflow-hidden">
    
      <img class="img-fluid position-absolute top-0 start-0 ${
        window.innerHeight > window.innerWidth ? "h-100" : "w-100"
      } opacity-50 weatherBackground"
           src="${bgImage}">

           <h2 class="text-white fw-bold">${name}<sup class="ms-2">${
    sys.country
  }</sup></h2>
  <hr >
           
      <div class="row">
          
        <div class="col-lg-4">

            <p class="fw-semibold">${Math.round(main.temp)}<sup>°C</sup></p>
            <p><strong>${weather[0].main}:</strong> ${
    weather[0].description
  }</p>
            <span>Feels Like: ${Math.round(main.feels_like)}<sup>°C</sup></span>
      
            <p>There is an humidity of <strong>${main.humidity}%</strong></p>
      
            <div class="bg-dark opacity-75 rounded" style="backdrop-filter: blur(20px); width: max-content;">  
              <img src="https://openweathermap.org/img/wn/${
                weather[0].icon
              }@2x.png">
            </div>
        </div>

        <div class="col-lg-4">
        
          <h4>Wind</h4>
          
          <p><strong>Deg:</strong> ${
            wind.deg
          } <span><i style="transform: rotate(${
    wind.deg
  }deg) scale(1.1);" class="bi bi-arrow-down-circle-fill text-dark"></i></span></p>
          <p><strong>Speed:</strong> ${wind.speed}m/s</p>

        </div>

      </div>

    </div>
    
    <div class="container-fluid position-relative p-4 rounded overflow-hidden">
      <div class="row gap-2 overflow-auto" id="forecast"></div>
    </div>
    `;

  populateForecast(coord);
};

const populateForecast = async (coord) => {
  const forecastData = await getForecast(coord.lat, coord.lon);

  if (forecastData.cod === 404 || forecastData.cod === "404") {
    document.getElementsByTagName("body")[0].innerHTML += `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <b>Error:</b> ${forecastData.message}. If the problem persists please try again later.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      `;
    return;
  }

  for (let i = 0; i < forecastData.list.length; i++) {
    const element = forecastData.list[i];

    if (document.getElementById(`dia${getForecastDay(element)}`)) {
      continue;
    }

    document.getElementById("forecast").innerHTML += `
      <h2 class="fw-bold">${element.dt_txt.split(" ")[0]}</h2>
      <hr class="border border-2 border-info">
      <div id="dia${getForecastDay(element)}" class="row">
      </div>
    `;
  }

  for (let i = 0; i < forecastData.list.length; i++) {
    const element = forecastData.list[i];

    document.getElementById(`dia${getForecastDay(element)}`).innerHTML += `
      <div class="card text-bg-dark mb-3 border-light m-2 col-sm-12 col-md-6 col-lg-2">
        <div class="card-header"><b>Time:</b> ${
          element.dt_txt.split(" ")[1]
        }</div>
          <div class="card-body">
            <h5 class="card-title">${element.weather[0].main}: ${
      element.weather[0].description
    }</h5>
            <p class="card-text">${element.main.temp}<sup>°C</sup></p>
            <p class="card-text"><b>Feels like:</b> ${
              element.main.feels_like
            }<sup>°C</sup></p>
            <img class="img-fluid p-2 bg-secondary rounded" src="https://openweathermap.org/img/wn/${
              element.weather[0].icon
            }@2x.png">
          </div>
      </div>
    `;
  }
};

const getForecastDay = (element) => {
  return element.dt_txt.split(" ")[0].split("-")[2];
};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("lastSearch")) {
    search(localStorage.getItem("lastSearch"));
  }

  document.getElementById("searchBar").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      search();
    }
  });

  document.getElementById("searchBtn").addEventListener("click", (e) => {
    search();
  });
});
