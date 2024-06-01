const apiKey = 'dee6fcc0700a5f465eb4a8f257124cf8';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

    document.querySelector('.weather-icon').setAttribute('src', 'images/' + data.weather[0].main + '.png');

}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
})

searchBox.addEventListener('keydown', () => {
    if (event.key === 'Enter') {
        checkWeather(searchBox.value);
    }
})

// checkWeather(city);