const h=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&e(i)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}};h();const o={cloudy:"./assets/cloudy.jfif",scatteredClouds:"./assets/scatteredClouds.jpg",fewClouds:"./assets/fewClouds.jpg",brokenClouds:"./assets/brokenClouds.jpg",sunny:"./assets/sunny.jpg",mist:"./assets/mist.jpg",rain:"./assets/rain.jpg",snow:"./assets/snow.jpg",thunder:"./assets/thunder.jpg",clearSky:"./assets/clearSky.jpg"},m="9bc19e404c11b8ea4f09b8055e3f3cf1",y=document.getElementById("contenedor"),b=async t=>await(await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${t}&lang=en&appid=${m}&units=metric`)).json(),w=async(t,s)=>{const e=await(await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${s}&appid=${m}&units=metric`)).json();return console.log(e),e},v=async t=>{switch(t){case"Rain":return o.rain;case"Clouds":return o.cloudy;case"Few Clouds":return o.fewClouds;case"Scattered Clouds":return o.scatteredClouds;case"Broken Clouds":return o.brokenClouds;case"Clear sky":return o.clearSky;case"Clear":return o.clearSky;case"Rain":return o.rain;case"Thunderstorm":return o.thunder;case"Snow":return o.snow;case"Mist":return o.mist;case"Shower Rain":return o.rain}},c=async(t=void 0)=>{const s=document.getElementById("searchBar"),a=await b(t!==void 0?t:s.value);if(s.value="",a.cod===404||a.cod==="404"){document.getElementsByTagName("body")[0].innerHTML+=`
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <b>Error:</b> ${a.message}. If the problem persists please try again later.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      `;return}const{clouds:e,coord:r,cod:n,wind:i,weather:d,sys:g,name:p,main:l}=a,f=await v(d[0].main);localStorage.setItem("lastSearch",p),y.innerHTML=`
    <div class="container-fluid position-relative p-4 rounded-3 overflow-hidden">
    
      <img class="img-fluid position-absolute top-0 start-0 ${window.innerHeight>window.innerWidth?"h-100":"w-100"} opacity-50 weatherBackground"
           src="${f}">

           <h2 class="text-white fw-bold">${p}<sup class="ms-2">${g.country}</sup></h2>
  <hr >
           
      <div class="row">
          
        <div class="col-lg-4">

            <p class="fw-semibold">${Math.round(l.temp)}<sup>\xB0C</sup></p>
            <p><strong>${d[0].main}:</strong> ${d[0].description}</p>
            <span>Feels Like: ${Math.round(l.feels_like)}<sup>\xB0C</sup></span>
      
            <p>There is an humidity of <strong>${l.humidity}%</strong></p>
      
            <div class="bg-dark opacity-75 rounded" style="backdrop-filter: blur(20px); width: max-content;">  
              <img src="https://openweathermap.org/img/wn/${d[0].icon}@2x.png">
            </div>
        </div>

        <div class="col-lg-4">
        
          <h4>Wind</h4>
          
          <p><strong>Deg:</strong> ${i.deg} <span><i style="transform: rotate(${i.deg}deg) scale(1.1);" class="bi bi-arrow-down-circle-fill text-dark"></i></span></p>
          <p><strong>Speed:</strong> ${i.speed}m/s</p>

        </div>

      </div>

    </div>
    
    <div class="container-fluid position-relative p-4 rounded overflow-hidden">
      <div class="row gap-2 overflow-auto" id="forecast"></div>
    </div>
    `,$(r)},$=async t=>{const s=await w(t.lat,t.lon);if(s.cod===404||s.cod==="404"){document.getElementsByTagName("body")[0].innerHTML+=`
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <b>Error:</b> ${s.message}. If the problem persists please try again later.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      `;return}for(let a=0;a<s.list.length;a++){const e=s.list[a];document.getElementById(`dia${u(e)}`)||(document.getElementById("forecast").innerHTML+=`
      <h2 class="fw-bold">${e.dt_txt.split(" ")[0]}</h2>
      <hr class="border border-2 border-info">
      <div id="dia${u(e)}" class="row">
      </div>
    `)}for(let a=0;a<s.list.length;a++){const e=s.list[a];document.getElementById(`dia${u(e)}`).innerHTML+=`
      <div class="card text-bg-dark mb-3 border-light m-2 col-sm-12 col-md-6 col-lg-2">
        <div class="card-header"><b>Time:</b> ${e.dt_txt.split(" ")[1]}</div>
          <div class="card-body">
            <h5 class="card-title">${e.weather[0].main}: ${e.weather[0].description}</h5>
            <p class="card-text">${e.main.temp}<sup>\xB0C</sup></p>
            <p class="card-text"><b>Feels like:</b> ${e.main.feels_like}<sup>\xB0C</sup></p>
            <img class="img-fluid p-2 bg-secondary rounded" src="https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png">
          </div>
      </div>
    `}},u=t=>t.dt_txt.split(" ")[0].split("-")[2];document.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("lastSearch")&&c(localStorage.getItem("lastSearch")),document.getElementById("searchBar").addEventListener("keydown",t=>{t.key==="Enter"&&c()}),document.getElementById("searchBtn").addEventListener("click",t=>{c()})});
