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
                precipProbability: body.currently.precipProbability,
                forecast: `${body.daily.data[0].summary} It is ${body.currently.temperature} degrees outside with a ${body.currently.precipProbability}% chance of rain.
Highest temperature hitting ${body.daily.data[0].temperatureHigh} degrees and lowest hittng ${body.daily.data[0].temperatureLow} degrees for the day.`
            });
        }
    });

};

module.exports = {
    forecast: forecast
}