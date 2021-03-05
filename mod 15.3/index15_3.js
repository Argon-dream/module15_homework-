const monitor = document.querySelector('#monitor');
const coords = document.querySelector('#coords');
const btn = document.querySelector('.j-btn-test');

// Функция, выводящая текст об ошибке
const error = () => {
    coords.textContent = 'Информация о местоположении недоступна';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    coords.textContent = `Координаты местонахождения пользователя: широта ${latitude} °, долгота ${longitude} °`;
}

btn.addEventListener('click', () => {
    const scrX = window.screen.width;
    const scrY = window.screen.height;
    monitor.textContent = `Размеры экрана пользователя: ${scrX}x${scrY}`;

    if (!navigator.geolocation) {
        coords.textContent = error;
    } else {
        coords.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});