import axios from "axios";

// Geocoding function using Nominatim API
export async function getCoordinates(city) {
  const geocodeURL = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    city
  )}&format=json&limit=1`;

  try {
    const response = await axios.get(geocodeURL);
    const data = response.data;

    if (data.length === 0) {
      throw new Error("City not found");
    }

    const { lat, lon } = data[0];

    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
      throw new Error("Invalid coordinates received");
    }

    return { latitude: lat, longitude: lon };
  } catch (error) {
    throw new Error("Error fetching coordinates");
  }
}

// Function to get weather data using the Open-Meteo API
export async function getWeather(latitude, longitude) {
  const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=rain_sum&timezone=Europe%2FBerlin&forecast_days=2`;
  const response = await axios.get(weatherURL);
  const data = response.data;
  return data.daily.rain_sum[1];
}
