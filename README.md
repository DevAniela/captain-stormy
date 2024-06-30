# Captain Stormy ☔

Captain Stormy is a weather forecasting application built as an exercise to practice integrating APIs and developing with Node.js and Express framework.

## Features

- **Weather Forecast**: Retrieve weather forecast for a specific city.
- **Geocoding**: Fetch coordinates (latitude, longitude) of a city using Nominatim API.
- **Error Handling**: Basic error handling for cases like invalid city names or API failures.
- **Styling**: Custom CSS styling for a pirate-themed interface.

## Technologies Used

- **Node.js**: Backend JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Axios**: HTTP client for making requests to APIs.
- **EJS**: Embedded JavaScript templates for server-side rendering.
- **CSS**: Styling for the user interface.

## Installation

1. **Clone the repository;**
2. **Navigate to the project directory;**
3. **Install dependencies;**
4. **Start the server;**
5. **Open your web browser and go to: http://localhost:3000 to use Captain Stormy.**

## Usage

- Enter a city name in the input field and click "Set Sail!" to get the weather forecast for tomorrow.
- If the city is found, it will display whether it will rain tomorrow.
- If there's an error (e.g., city not found or API error), an appropriate error message will be displayed.

## Known Issues

- Error handling can be further refined to provide more specific feedback to users.
- Limited to basic functionality; additional features could be added for a richer user experience.

## Future Improvements

- Enhance error handling to provide more informative messages.
- Add caching mechanisms for API responses to improve performance.
- Implement user authentication and personalized weather preferences.

## Credits

This project was created as part of Angela Yu's Web Development Bootcamp on Udemy.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
