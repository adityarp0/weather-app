import { fetchcoordinates,fetchweather } from "./api.js";



const searchubtton = document.querySelector('.searchbutton');
const cityinput = document.getElementById('cityinput');
const box2half1 = document.querySelector('.box2half1');
const box2half2 = document.querySelector('.box2half2');
const box3=document.querySelector(".box3");

const weatherConditions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Freezing rain light",
  67: "Freezing rain heavy",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Rain showers slight",
  81: "Rain showers moderate",
  82: "Rain showers violent",
  85: "Snow showers slight",
  86: "Snow showers heavy",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Severe thunderstorm with hail"
};


searchubtton.addEventListener("click",async()=>
{
  const city=cityinput.value.trim();
  if (!city) return alert("Enter a city name");

  try
  {
    const {latitude,longitude,name,country}=await fetchcoordinates(city);
    const weatherdata=await fetchweather(latitude,longitude);
    const current=weatherdata.current;

    const temperature = current.temperature_2m;
    const humidity = current.relative_humidity_2m;
    const pressure = current.pressure_msl;
    const visibility=current.visibility;
    const surface_pressure=current.surface_pressure;
    const wind = current.wind_speed_10m;
    const weatherCode = current.weathercode;
    const isDay = current.is_day === 1 ? "Day" : "Night";
    const condition = weatherConditions[weatherCode] || "Unknown";

    //contents in box2half1

      box2half1.innerHTML = 
    `
      <h2>${name}, ${country}</h2>
      <p>${new Date().toLocaleDateString()}</p>
      <p>${new Date().toLocaleTimeString()}</p>
      <h3>${temperature}°C</h3>
      <p>${condition} (${isDay})</p>
    `;

    //contents in box2half2

     box2half2.innerHTML = 
     `
      <p>Humidity: ${humidity}%</p>
      <p>Wind: ${wind} km/h</p>
      <p>Pressure: ${pressure} hPa</p>
      <p>Visbility:  ${visibility} m</p>
      <p>Surface Pressure: ${surface_pressure}hPa</p>
    `;

    //box3 content


const daily = weatherdata.daily;

let forecastTable = `
 
  <table class="forecast-table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Max Temp (°C)</th>
        <th>Min Temp (°C)</th>
        <th>Rain (mm)</th>
        <th>Wind (km/h)</th>
      </tr>
    </thead>
    <tbody>
`;

for (let i = 0; i < 5; i++) {
  forecastTable += `
    <tr>
      <td>${daily.time[i]}</td>
      <td>${daily.temperature_2m_max[i]}</td>
      <td>${daily.temperature_2m_min[i]}</td>
      <td>${daily.precipitation_sum ? daily.precipitation_sum[i] : '-'}</td>
      <td>${daily.wind_speed_10m_max ? daily.wind_speed_10m_max[i] : '-'}</td>
    </tr>
  `;
}

forecastTable += `
    </tbody>
  </table>
`;

box3.innerHTML = forecastTable;

  }
  catch(error)
  {
    console.log(error);
    alert("Could not fetch data , enter city name");
  }
});

//default city
window.addEventListener("DOMContentLoaded", () => {
  cityinput.value = "Thiruvananthapuram"; // 
  searchubtton.click(); 
});



