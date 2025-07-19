import { fetchcoordinates,fetchweather } from "./api";

const searchubtton = document.querySelector('.searchbutton');
const cityinput = document.getElementById('cityinput');
const box2half1 = document.querySelector('.box2half1');
const box2half2 = document.querySelector('.box2half2');

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
    const wind = current.wind_speed_10m;
    const weatherCode = current.weathercode;
    const isDay = current.is_day === 1 ? "Day" : "Night";
    const condition = weatherConditions[weatherCode] || "Unknown";
  }
});

