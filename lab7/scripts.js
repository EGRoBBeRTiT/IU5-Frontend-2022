const apiKey = '5d6b5dc8579b33392457225a3108de55'

window.onload = () => {
    let lat = '';
    let lon = '';
    let geo = navigator.geolocation
    geo.getCurrentPosition(props => {
        lat = props.coords.latitude
        lon = props.coords.longitude
        getCity(lat, lon)
    })
    getCity(lat, lon)
}

function getCity(lat, lon) {
    cityName = document.getElementById("input_form").value;
    if (cityName === '') {
        cityName = 'Москва'
    } else {
        lat = ''
        lon = ''
    }

    let url = ''
    if (lat === '') {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&cnt=40&units=metric&lang=ru`
    } else {
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=40&units=metric&lang=ru`
    }
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(
            result => {
                if (result.cod === "404")
                    alert("Город не найден")
                else {
                    pushWeather(result)
                }
            },
            error => alert(error)
        );
}

function pushWeather(result) {
    document.getElementById('city').innerHTML = `${result.city.name}`;
    document.getElementById("weather_screen").style.backgroundImage = `url(screens/${result.list[0].weather[0].icon}.png)`;
    document.getElementById('temp').innerHTML = `${Math.round(result.list[0].main.temp)}°`;
    document.getElementById('main_icon').src = `icons/${result.list[0].weather[0].icon}.png`;
    document.getElementById('description').innerHTML = `${result.list[0].weather[0].description}`;
    document.getElementById('feels_like').innerHTML = `Ощущается как <strong>${Math.round(result.list[0].main.feels_like)}°</strong>`;
    document.getElementById('maxmin').innerHTML = `Макс.: <strong>${Math.round(result.list[0].main.temp_max)}°</strong>, мин.: <strong>${Math.round(result.list[0].main.temp_min)}°</strong>`;
    document.getElementById('wind_value').innerHTML = `<strong>${Math.round(result.list[0].wind.speed)}</strong> м/с`;
    document.getElementById('humidity_value').innerHTML = `<strong>${Math.round(result.list[0].main.humidity)}</strong>%`;
    document.getElementById('press_value').innerHTML = `<strong>${Math.round(0.75008 * result.list[0].main.pressure)}</strong> мм рт. ст.`;
    document.getElementById('cloud').innerHTML = `Облачность: <strong>${Math.round(result.list[0].clouds.all)}</strong>%`;
    document.getElementById('visibility').innerHTML = `Видимость: <strong>${Math.round(result.list[0].visibility / 1000)}</strong> км`;
    document.getElementById('rain_pred').innerHTML = `Вероятность осадков: <strong>${Math.round(result.list[0].pop * 100)}</strong>%`;


    if (document.getElementById('predict_today_id_0') === null) {
        result.list.map((list, index) => {
            let div = document.createElement('div');
            div.className = "predict_today"
            div.id = `predict_today_id_${index}`
            div.innerHTML = `
                <p id="time_today">${list.dt_txt.slice(11, 16)}</p>
                <img id="sub_icon" src="icons/${list.weather[0].icon}.png" width="50px">
                <p id="temp_then">${Math.round(list.main.temp)}°</p>
                `
            if (list.dt_txt.slice(11, 16) === '00:00') {
                div.innerHTML = `
                    <p id="time_today"><strong>${list.dt_txt.slice(8, 10)}.${list.dt_txt.slice(5, 7)}</strong></p>
                    <p id="time_today">00:00</p>
                    <img id="sub_icon" src="icons/${list.weather[0].icon}.png" width="50px">
                    <p id="temp_then"><strong>${Math.round(list.main.temp)}°</strong></p>
                    `
            }
            if (index === 0) {
                div.innerHTML = `
                    <p id="time_today"><strong>Сейчас</strong></p>
                    <img id="sub_icon" src="icons/${list.weather[0].icon}.png" width="50px">
                    <p id="temp_then"><strong>${Math.round(list.main.temp)}°<strong></p>
                    `
            }
            document.getElementById('temp_today_id').appendChild(div);
        })
    } else {
        result.list.map((list, index) => {
            let predict_today = document.getElementById(`predict_today_id_${index}`);
            predict_today.innerHTML = `
                <p id="time_today">${list.dt_txt.slice(11, 16)}</p>
                <img id="sub_icon" src="icons/${list.weather[0].icon}.png" width="50px">
                <p id="temp_then">${Math.round(list.main.temp)}°</p>
                `
            if (list.dt_txt.slice(11, 16) === '00:00') {
                predict_today.innerHTML = `
                    <p id="time_today"><strong>${list.dt_txt.slice(8, 10)}.${list.dt_txt.slice(5, 7)}</strong></p>
                    <p id="time_today">00:00</p>
                    <img id="sub_icon" src="icons/${list.weather[0].icon}.png" width="50px">
                    <p id="temp_then"><strong>${Math.round(list.main.temp)}°</strong></p>
                    `
            }
            if (index === 0) {
                predict_today.innerHTML = `
                    <p id="time_today"><strong>Сейчас</strong></p>
                    <img id="sub_icon" src="icons/${list.weather[0].icon}.png" width="50px">
                    <p id="temp_then"><strong>${Math.round(list.main.temp)}</strong>°</p>
                    `
            }
        })
    }
}