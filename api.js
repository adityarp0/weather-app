export async function fetchcoordinates(city)
{
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
  const data = await response.json();

  if (!data.results || data.results.length ===0)
  {
    throw new Error("City not Found");
  }

  const {latitude,longitude,name,country}=data.results[0];
  return {latitude,longitude,name,country};

}

export async function fetchweather(lat,long)
{
  const response=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,weathercode,wind_speed_10m,relative_humidity_2m,pressure_msl&timezone=auto`);
  const data = await response.json();

  return data;
}