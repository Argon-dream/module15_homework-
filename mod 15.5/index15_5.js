const wsUri = "wss://echo.websocket.org/";

function pageLoaded() {
    const infoOutput = document.querySelector(".info_output");
    const chatOutput = document.querySelector(".chat_output");
    const input = document.querySelector("input");
    const sendBtn = document.querySelector(".btn_send");
    const sendGeo = document.querySelector(".btn_geo");

    let socket = new WebSocket(wsUri);

    socket.onopen = () => {
        infoOutput.innerText = "Соединение установлено";
    }

    socket.onmessage = (event) => {
        writeToChat(event.data, true);
    }

    socket.onerror = () => {
        infoOutput.innerText = "При передаче данных произошла ошибка";
    }

    sendBtn.addEventListener("click", sendMessage);

    function sendMessage() {
        if (!input.value) return;
        socket.send(input.value);
        writeToChat(input.value, false);
        input.value === "";
    }

    function writeToChat(message, isRecieved) {
        let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
        chatOutput.innerHTML += messageHTML;
    }

    sendGeo.addEventListener("click", sendGeoLocation);

    // Функция, выводящая текст об ошибке
    const error = () => {
        chatOutput.innerHTML += "Информация о местоположении недоступна";
    }
    // Функция, срабатывающая при успешном получении геолокации
    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        let messageHTML = `<div><a target="_blank" style="text-decoration: none;" href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" align="left">Ваша гео-локация</a></div>`;
        chatOutput.innerHTML += messageHTML;
    }

    function sendGeoLocation() {
        if (!navigator.geolocation) {
            chatOutput.innerHTML = error;
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }
}

document.addEventListener("DOMContentLoaded", pageLoaded);