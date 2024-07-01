import express from "express";
import { getCoordinates, getWeather } from "./controller.js"; // Importing controller functions

const router = express.Router();

// Route for the homepage
router.get("/", (req, res) => {
  res.render("index.ejs"); // Render the "index.ejs" view template
});

// Route for weather information
router.get("/weather", async (req, res) => {
  const { city } = req.query; // Extract city from query parameters

  // Check if the input length is reasonable (e.g., at least 2 characters) and contains only valid characters
  const isValidCity = /^[a-zA-Z\s]+$/.test(city);

  if (!city || city.length < 2 || !isValidCity) {
    console.log("Validation failed: city name invalid or too short");
    return res.render("index.ejs", {
      error:
        "Shiver me timbers! Looks like we've hit rough seas. Try enterin' the city name again.",
    });
  }

  try {
    // Call controller functions to fetch data
    const { latitude, longitude } = await getCoordinates(city);

    // If no valid coordinates are returned, the city is not valid
    if (!latitude || !longitude) {
      console.log("Validation failed: city name not found");
      return res.render("index.ejs", {
        error:
          "Arrr, we've hit choppy waters! 'Tis a city not found. Set a course again, matey!",
      });
    }

    const rainSumTomorrow = await getWeather(latitude, longitude);
    const willRain = rainSumTomorrow > 0;

    // Render "result.ejs" with data
    res.render("result.ejs", { city, willRain });
  } catch (error) {
    console.error(error);

    // Render "index.ejs" with error message
    res.render("index.ejs", {
      error:
        "Arrr, we've hit choppy waters! 'Tis a city not found or an error fetchin' the weather data. Set a course again, matey!",
    });
  }
});

export default router;
