const weatherForm = document.querySelector('form');
const message1 = document.querySelector('#message_1');
const message2 = document.querySelector('#message_2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent = 'Fetching forecast...';
    fetch(`/weather?address=${e.target[0].value}`).then((data) => {
        data.json().then(data => {
            if (data.error) {
                message1.textContent = data.error;
                message2.textContent = '';
            } else {
                message1.textContent = 'Location: ' + data.location;
                message2.textContent = 'Forecast: ' + data.summary;
            }
        });
    });
});
