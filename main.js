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

const contenedor = document.getElementById("contenedor");

const getData = async (input) => {
  const key = "9bc19e404c11b8ea4f09b8055e3f3cf1";

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input}&lang=en&appid=${key}&units=metric`
  );

  const data = await response.json();

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

const search = async () => {
  const input = document.getElementById("searchBar");

  const data = await getData(input.value);

  console.log(data);

  input.value = "";
  if (data.cod === 404 || data.cod === "404") {
    contenedor.innerHTML = `
        <h2>There was an error please input your city again</h2>
        <p>If the problem persist try again later</p>
      `;
    return;
  }

  const { clouds, coord, cod, wind, weather, sys, name, main } = data;

  const bgImage = await selectBgImage(weather[0].main);

  console.log({
    clouds,
    coord,
    cod,
    wind,
    weather,
    sys,
    name,
    main,
  });

  contenedor.innerHTML += `
    <div class="container-fluid position-relative p-4 rounded overflow-hidden">
    
      <img class="img-fluid position-absolute top-0 start-0 w-100 h-100 opacity-50 weatherBackground"
           src="${bgImage}">

           <h2 class="text-white fw-bold">${name}<sup class="ms-2">${
    sys.country
  }</sup></h2>
           
      <div class="row">
        <hr >
          
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
  }deg);" class="bi bi-arrow-down-circle-fill text-dark"></i></span></p>
          <p><strong>Speed:</strong> ${wind.speed}m/s</p>

        </div>

      </div>

    </div>
    `;
};

document.getElementById("searchBar").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    search();
  }
});

document.getElementById("searchBtn").addEventListener("click", (e) => {
  search();
});
