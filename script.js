const apiKey = 'dee6fcc0700a5f465eb4a8f257124cf8';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const unitToggle = document.getElementById('temp-unit');
let isCelsius = true;


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    let d = new Date()
    let localTime = d.getTime()
    let localOffset = d.getTimezoneOffset() * 60000
    let utc = localTime + localOffset
    let cityTime = utc + (1000 * data.timezone)
    nd = new Date(cityTime)
    console.log(nd);

    const formattedDate = convertToStandardTime(nd.getTime() / 1000);
    const sunrise = convertToStandardTime(data.sys.sunrise, true);
    const sunset = convertToStandardTime(data.sys.sunset, true);

    document.querySelector('.date').innerHTML = formattedDate;
    document.querySelector('.sunrise').innerHTML = 'Sunrise: ' + sunrise;
    document.querySelector('.sunset').innerHTML = 'Sunset: ' + sunset;  
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.description').innerHTML = data.weather[0].description;
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';
    // document.querySelector('.weather-icon').setAttribute('src', 'images/' + data.weather[0].main + '.png');

    setWeatherIcon(data.weather[0].main, nd, data.sys.sunrise, data.sys.sunset, data.timezone);

    if (isCelsius) {
        document.getElementById('temp-unit').innerHTML = '°C';
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.temp-min').innerHTML = 'Max: ' + Math.round(data.main.temp_min) + ' °C';
        document.querySelector('.temp-max').innerHTML = 'Min: ' + Math.round(data.main.temp_max) + ' °C';
        document.querySelector('.temp-feels-like').innerHTML = 'Feels like: ' + Math.round(data.main.feels_like) + ' °C';
    } else {
        document.getElementById('temp-unit').innerHTML = '°F';
        document.querySelector('.temp').innerHTML = Math.round(celsiusToFahrenheit(data.main.temp)) + '°F';
        document.querySelector('.temp-min').innerHTML = 'Min: ' + Math.round(celsiusToFahrenheit(data.main.temp_min)) + ' °F';
        document.querySelector('.temp-max').innerHTML = 'Max: ' + Math.round(celsiusToFahrenheit(data.main.temp_max)) + ' °F';
        document.querySelector('.temp-feels-like').innerHTML = 'Feels like: ' + Math.round(celsiusToFahrenheit(data.main.feels_like)) + ' °F';
    }

    updateBackground(nd);

}

function convertToStandardTime(militaryTime, timeOnly = false) {
    const date = new Date(militaryTime * 1000);

    const hours = date.getHours() % 12 || 12;
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const ampm = date.getHours() < 12? 'AM' : 'PM';

    if (timeOnly) {
        return `${hours}:${minutes} ${ampm}`;
    } else {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`
    }
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
} 

function updateBackground(date) {
    const hours = date.getHours();
    console.log("Current hour: ", hours);
    let background;

    if (hours >= 6 && hours < 12) {
        background = 'linear-gradient(180deg, #62c2ee, #fae183)';
        } else if (hours >= 12 && hours < 18) {
        background = 'linear-gradient(180deg, #0c52c4, #6bc6f6)';
        } else if (hours >= 18 && hours < 22) {
        background = 'linear-gradient(180deg, #0c194d, #e68cba)';
        } else {
        background = 'linear-gradient(180deg, #040e32, #363b92)';
        } 
    document.querySelector('.card').style.background = background;

}

function setWeatherIcon(weather, date, sunrise, sunset, timezone) {
    const currentTime = date.getTime() / 1000;
    const localSunrise = sunrise + timezone;
    const localSunset = sunset + timezone;

    let icon = weather; // Default weather icon

    if (currentTime < localSunrise || currentTime > localSunset) {
        if (weather === 'Clear' || weather === 'Mist' || weather === 'Haze') {
            icon = 'moon';
        } else if (weather === 'Clouds' || weather === 'Drizzle' || weather === 'Fog' || weather === 'Rain' || weather === 'Snow') {
            icon = 'CloudyNight';
        } else {
            // 
            icon = weather; //Default weather icon
        }}
        
    if (currentTime > localSunrise || currentTime < localSunset) {
        if (weather === 'Clear') {
            icon = 'Clear';
        } else if (weather === 'Mist') {
            icon = 'Mist';
        } else if (weather === 'Haze') {
            icon = 'Haze';
        } else if (weather === 'Drizzle') {
            icon = 'Drizzle';
        } else if (weather === 'Fog') {
            icon = 'Fog';
        } else if (weather === 'Snow') {
            icon = 'Snow'; 
        } else if (weather === 'Rain') {
            icon = 'Rain';
        } else {
            icon = weather; //Default weather icon
        }}
    

    // } else if (weather === 'Clear') {
    //     icon = 'moon';
    // } else if (weather === 'Clouds') {
    //     icon = 'CloudyNight';
    // }

    document.querySelector('.weather-icon').setAttribute('src', 'images/' + icon + '.png');
    console.log(icon);
}    

unitToggle.addEventListener('click', () => {
    isCelsius = !isCelsius;
    checkWeather(searchBox.value);
})

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
})

searchBox.addEventListener('keydown', () => {
    if (event.key === 'Enter') {
        checkWeather(searchBox.value);
    }
})