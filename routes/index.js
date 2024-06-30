import express from "express";
import { getCoordinates, getWeather } from "./controller.js"; // Importing controller functions

const router = express.Router();

// Route for the homepage
router.get("/", (req, res) => {
  res.render("index.ejs"); // Render the index.ejs view template
});

// Route for weather information
router.get("/weather", async (req, res) => {
  const { city } = req.query; // Extract city from query parameters

  try {
    // Call controller functions to fetch data
    const { latitude, longitude } = await getCoordinates(city);
    const rainSumTomorrow = await getWeather(latitude, longitude);
    const willRain = rainSumTomorrow > 0;

    // Render result.ejs with data
    res.render("result.ejs", { city, willRain });
  } catch (error) {
    console.error(error);

    // Render index.ejs with error message
    res.render("index.ejs", {
      error:
        "Arrr, we've hit choppy waters! 'Tis a city not found or an error fetchin' the weather data. Set a course again, matey!",
    });
  }
});

export default router;
