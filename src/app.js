const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const weather = require('../utils/weather');

const app = express();
const port = process.env.PORT || 3000;

//Setup paths for the application
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup public directory for the application
app.use(express.static(publicDirPath));

//setup handlebars for the application
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup  routes for the application
app.get('', (_req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Saikat'
    });
})

app.get('/about', (_req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Saikat'
    });
})

app.get('/help', (_req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Some helpful text',
        name: 'Saikat'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address.'
        })
    }

    geocode.getLocationData(req.query.address, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            res.send({ error });
        } else {
            weather.forecast(latitude, longitude, (error, { summary, temperature, precipProbability } = {}) => {
                if (error) {
                    res.send({ error });
                } else {
                    res.send({
                        location: location,
                        summary: summary,
                        temperature: temperature,
                        precipProbability: `${precipProbability}%`
                    });
                }
            });
        }
    });
})

app.get('/help/*', (_req, res) => {
    res.render('not-found', {
        title: '404',
        name: 'Saikat',
        text: 'Help page not found.'
    });
})

app.get('*', (_req, res) => {
    res.render('not-found', {
        title: '404',
        name: 'Saikat',
        text: 'Page not found.'
    });
})

app.listen(port, () => {
    console.log(`Server is up in ${port}`);
});