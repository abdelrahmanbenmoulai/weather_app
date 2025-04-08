const API_KEY = '91632fb61d50db82e95dffd1e4d345a5';

async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value;

    if (!city) return;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        if (response.ok) {
            document.getElementById('city').textContent = data.name;
            document.getElementById('temperature').textContent =
                `${Math.round(data.main.temp)}°C`;
            document.getElementById('description').textContent =
                data.weather[0].description;
            document.getElementById('humidity').textContent =
                `Humidity: ${data.main.humidity}%`;
            document.getElementById('wind').textContent =
                `Wind: ${Math.round(data.wind.speed)} km/h`;
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        alert('Error fetching weather data. Please try again.');
    }
}

document.getElementById('city-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeather();
    }
});
const weatherIcons = {
    'Clear': {
        day: 'fa-sun',
        night: 'fa-moon'
    },
    'Clouds': {
        day: 'fa-cloud-sun',
        night: 'fa-cloud-moon'
    },
    'Rain': {
        day: 'fa-cloud-rain',
        night: 'fa-cloud-rain'
    },
    'Drizzle': {
        day: 'fa-cloud-rain',
        night: 'fa-cloud-rain'
    },
    'Thunderstorm': {
        day: 'fa-bolt',
        night: 'fa-bolt'
    },
    'Snow': {
        day: 'fa-snowflake',
        night: 'fa-snowflake'
    },
    'Mist': {
        day: 'fa-smog',
        night: 'fa-smog'
    },
    'Smoke': {
        day: 'fa-smog',
        night: 'fa-smog'
    },
    'Haze': {
        day: 'fa-smog',
        night: 'fa-smog'
    },
    'Dust': {
        day: 'fa-smog',
        night: 'fa-smog'
    },
    'Fog': {
        day: 'fa-smog',
        night: 'fa-smog'
    },
    'Sand': {
        day: 'fa-smog',
        night: 'fa-smog'
    },
    'Ash': {
        day: 'fa-smog',
        night: 'fa-smog'
    },
    'Squall': {
        day: 'fa-wind',
        night: 'fa-wind'
    },
    'Tornado': {
        day: 'fa-wind',
        night: 'fa-wind'
    }
};

async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value;

    if (!city) return;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        if (response.ok) {
            document.getElementById('city').textContent = data.name;

            const weatherMain = data.weather[0].main;
            const currentTime = new Date().getTime() / 1000;
            const sunrise = data.sys.sunrise;
            const sunset = data.sys.sunset;
            const isDaytime = currentTime > sunrise && currentTime < sunset;

            const iconClass = weatherIcons[weatherMain] ?
                (isDaytime ? weatherIcons[weatherMain].day : weatherIcons[weatherMain].night) :
                'fa-cloud';

            const iconElement = document.querySelector('#weather-icon i');
            iconElement.className = `fas ${iconClass}`;

            document.getElementById('temperature').textContent =
                `${Math.round(data.main.temp)}°C`;
            document.getElementById('description').textContent =
                data.weather[0].description;
            document.getElementById('humidity').textContent =
                `Humidity: ${data.main.humidity}%`;
            document.getElementById('wind').textContent =
                `Wind: ${Math.round(data.wind.speed)} km/h`;
        }
    } catch (error) {
        console.log('Error:', error);
    }
}