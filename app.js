// Run npm init to create a package.json file
// Install required dependencies: express, axios, and ejs
// Set up the project structure (public, views and routes folders)

// Import express and axios
import express from "express";
import axios from "axios";
import { fileURLToPath } from "url";
import { dirname } from "path"; // Import the dirname function from the path module

import router from "./routes/index.js"; // Import router from index.js

// Set up an Express server
const app = express();
const port = 3000;

// Use URL and path to resolve the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); // Use __dirname directly for setting views path

// Use the router
app.use("/", router); // Use router for all routes

// Geocoding function using Nominatim API
async function getCoordinates(city) {
  const geocodeURL = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    city
  )}&format=json&limit=1`;

  try {
    const response = await axios.get(geocodeURL);
    const data = response.data;

    if (data.length === 0) {
      throw new Error("City not found"); // Handle case where no results are returned
    }

    const { lat, lon } = data[0];

    // Check if lat and lon are valid numbers
    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
      throw new Error("Invalid coordinates received");
    }

    return { latitude: lat, longitude: lon };
  } catch (error) {
    throw new Error("Error fetching coordinates"); // Propagate error to calling function
  }
}

// Function to get weather data using the Open-Meteo API
async function getWeather(latitude, longitude) {
  const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=rain_sum&timezone=Europe%2FBerlin&forecast_days=2`;
  const response = await axios.get(weatherURL);
  const data = response.data;
  return data.daily.rain_sum[1]; // Index 1 is for tomorrow
}

// Display "index.ejs" when user goes to the homepage
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Set the "/weather" endpoint for passing data to the "result.ejs" file, with the data to be displayed (city name, rain forecast for tomorrow)
app.get("/weather", async (req, res) => {
  const city = req.query.city;

  // Check if the input length is reasonable (e.g., at least 2 characters)
  if (city.length < 2) {
    return res.render("index.ejs", {
      error:
        "Shiver me timbers! Looks like we've hit rough seas. Try enterin' the city name again.",
    });
  }

  try {
    const { latitude, longitude } = await getCoordinates(city);
    const rainSumTomorrow = await getWeather(latitude, longitude);
    const willRain = rainSumTomorrow > 0;

    res.render("result.ejs", { city, willRain });
  } catch (error) {
    console.error(error);
    // Render error message if city is not found or other errors occur
    res.render("index.ejs", {
      error:
        "Arrr, we've hit choppy waters! 'Tis a city not found or an error fetchin' the weather data. Set a course again, matey!",
    });
  }
});

// Listen on the predefined port and start the server
app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});

// Push the project to GitHub
