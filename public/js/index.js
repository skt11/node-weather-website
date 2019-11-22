const weatherForm = document.querySelector('form');
const message1 = document.querySelector('#message_1');
const message2 = document.querySelector('#message_2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent = 'Fetching forecast...';
    message2.textContent = '';
    fetch(`/weather?address=${e.target[0].value}`).then((data) => {
        data.json().then(({ error, location, forecast }) => {
            if (error) {
                message1.textContent = error;
                message2.textContent = '';
            } else {
                message1.textContent = 'Location: ' + location;
                message2.textContent = 'Forecast: ' + forecast;
            }
        });
    });
});
