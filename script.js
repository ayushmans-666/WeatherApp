// You have to replace your API keys
const apiKey = "Put your oen API key";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        fetchWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city !== "") {
            fetchWeather(city);
        } else {
            alert("Please enter a city name!");
        }
    }
});

async function fetchWeather(city) {
    const weatherInfo = document.getElementById("weatherInfo");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found. Please check spelling!");
        }

        const data = await response.json();

        // Update UI
        document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °C`;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // Dynamic background based on weather
        const weatherMain = data.weather[0].main.toLowerCase();
        if (weatherMain.includes("cloud")) {
            document.body.style.backgroundColor = "#d3d3d3"; // cloudy
        } else if (weatherMain.includes("rain")) {
            document.body.style.backgroundColor = "#5f9ea0"; // rainy
        } else if (weatherMain.includes("clear")) {
            document.body.style.backgroundColor = "#87ceeb"; // clear
        } else if (weatherMain.includes("snow")) {
            document.body.style.backgroundColor = "#f0f8ff"; // snowy
        } else {
            document.body.style.backgroundColor = "#87ceeb"; // default
        }
    } catch (error) {
        weatherInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

