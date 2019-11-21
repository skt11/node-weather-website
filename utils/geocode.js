const request = require('request');

const getLocationData = (location, callBack) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?limit=1&access_token=pk.eyJ1Ijoic2t0MTEiLCJhIjoiY2szMXBoMjB2MGFtbzNjczNoaDh4dndudCJ9.-v6anQfUTm2ARkkLEDMfIw`
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callBack('Unable to connect to geocoding service.');
        } else if (!body.features.length || !location) {
            callBack('Place not found, try with different location.');
        } else {
            callBack(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });

}

module.exports = {
    getLocationData: getLocationData
}