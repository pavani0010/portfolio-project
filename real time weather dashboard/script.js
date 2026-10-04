// DOM Elements

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const message = document.getElementById("message");
const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");

const temperature = document.getElementById("temperature");
const temperature2 = document.getElementById("temperature2");

const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

const weatherDescription =
    document.getElementById("weatherDescription");

const weatherIcon =
    document.getElementById("weatherIcon");

const updatedTime =
    document.getElementById("updatedTime");


// API URLs

const GEOCODING_API =
    "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_API =
    "https://api.open-meteo.com/v1/forecast";


// Search Button Event

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {

        showMessage(
            "Please enter a city name.",
            true
        );

        weatherCard.classList.add("hidden");

        return;
    }

    getWeather(city);
});


// Enter Key Event

cityInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {

        searchBtn.click();
    }
});


// Main Weather Function

async function getWeather(city) {

    try {

        showMessage(
            "Searching for weather information...",
            false
        );

        weatherCard.classList.add("hidden");

        // Step 1:
        // Find latitude and longitude of city

        const locationResponse =
            await fetch(
                `${GEOCODING_API}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
            );

        if (!locationResponse.ok) {

            throw new Error(
                "Unable to connect to location service."
            );
        }

        const locationData =
            await locationResponse.json();


        // Check city

        if (
            !locationData.results ||
            locationData.results.length === 0
        ) {

            throw new Error(
                "City not found. Please enter a valid city name."
            );
        }


        // Extract location data

        const location =
            locationData.results[0];

        const latitude =
            location.latitude;

        const longitude =
            location.longitude;

        const name =
            location.name;

        const country =
            location.country;


        // Step 2:
        // Fetch weather data

        const weatherResponse =
            await fetch(
                `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
            );


        if (!weatherResponse.ok) {

            throw new Error(
                "Unable to fetch weather information."
            );
        }


        const weatherData =
            await weatherResponse.json();


        // Step 3:
        // Process JSON data

        displayWeather(
            name,
            country,
            weatherData
        );


        showMessage(
            "Weather information updated successfully.",
            false
        );

    }

    catch (error) {

        console.error(
            "Weather API Error:",
            error
        );

        showMessage(
            error.message ||
            "Something went wrong. Please try again.",
            true
        );

        weatherCard.classList.add("hidden");
    }
}


// Display Weather

function displayWeather(
    name,
    country,
    data
) {

    const current =
        data.current;


    // Location

    cityName.textContent =
        name;

    countryName.textContent =
        country;


    // Temperature

    const currentTemperature =
        current.temperature_2m;

    temperature.textContent =
        currentTemperature;

    temperature2.textContent =
        currentTemperature;


    // Humidity

    humidity.textContent =
        current.relative_humidity_2m;


    // Wind

    windSpeed.textContent =
        current.wind_speed_10m;


    // Weather condition

    const code =
        current.weather_code;

    const condition =
        getWeatherDescription(code);

    weatherDescription.textContent =
        condition.text;

    weatherIcon.textContent =
        condition.icon;


    // Updated time

    const time =
        new Date();

    updatedTime.textContent =
        time.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    // Show card

    weatherCard.classList.remove(
        "hidden"
    );
}


// Convert Weather Code

function getWeatherDescription(code) {

    const weatherCodes = {

        0: {
            text: "Clear Sky",
            icon: "☀️"
        },

        1: {
            text: "Mainly Clear",
            icon: "🌤️"
        },

        2: {
            text: "Partly Cloudy",
            icon: "⛅"
        },

        3: {
            text: "Overcast",
            icon: "☁️"
        },

        45: {
            text: "Fog",
            icon: "🌫️"
        },

        48: {
            text: "Depositing Rime Fog",
            icon: "🌫️"
        },

        51: {
            text: "Light Drizzle",
            icon: "🌦️"
        },

        53: {
            text: "Moderate Drizzle",
            icon: "🌦️"
        },

        55: {
            text: "Dense Drizzle",
            icon: "🌧️"
        },

        61: {
            text: "Slight Rain",
            icon: "🌦️"
        },

        63: {
            text: "Moderate Rain",
            icon: "🌧️"
        },

        65: {
            text: "Heavy Rain",
            icon: "🌧️"
        },

        71: {
            text: "Slight Snow",
            icon: "🌨️"
        },

        73: {
            text: "Moderate Snow",
            icon: "❄️"
        },

        75: {
            text: "Heavy Snow",
            icon: "❄️"
        },

        80: {
            text: "Rain Showers",
            icon: "🌦️"
        },

        81: {
            text: "Moderate Rain Showers",
            icon: "🌧️"
        },

        82: {
            text: "Heavy Rain Showers",
            icon: "⛈️"
        },

        95: {
            text: "Thunderstorm",
            icon: "⛈️"
        },

        96: {
            text: "Thunderstorm with Hail",
            icon: "⛈️"
        },

        99: {
            text: "Heavy Thunderstorm with Hail",
            icon: "⛈️"
        }
    };


    return (
        weatherCodes[code] ||
        {
            text: "Unknown Weather",
            icon: "🌡️"
        }
    );
}


// Message Function

function showMessage(
    text,
    isError
) {

    message.textContent =
        text;

    if (isError) {

        message.style.color =
            "#fee2e2";

    } else {

        message.style.color =
            "white";
    }
}