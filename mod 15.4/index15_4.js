const result = document.querySelector('#result');
const btn = document.querySelector('.j-btn-test');

// Функция, выводящая текст об ошибке
const error = () => {
    result.textContent = 'Информация о местоположении недоступна';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
        .then((response) => {
            return(response.json());
        })
        .then((data) => {
            result.textContent = `${data.timezone}. ${data.date_time_txt}`;
        });
}

btn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        result.textContent = error;
    }
    else {
        result.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});