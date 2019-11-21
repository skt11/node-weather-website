const request = require('request');

const forecast = (latitude, longitude, callBack) => {
    const url = `https://api.darksky.net/forecast/40daa51b7951057f8a54eb7ce4ce449d/${latitude},${longitude}?units=si`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callBack('Unable to connect to weather service.', {});
        } else if (body.error) {
            callBack(body.error);
        } else {
            callBack(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            });
        }
    });

};

module.exports = {
    forecast: forecast
}