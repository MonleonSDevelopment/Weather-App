const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

hbs.registerPartials(partialsPath);

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup statis directory to serve
app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather App',
        name: 'Santiago Monleon'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Me',
        name: 'Santiago Monleon'        
    });
});

app.get('/help', (req, res) =>{
    res.render('help.hbs', {
        title: 'Help Page',
        name: 'Santiago Monleon',
        helpText: 'This is the help text'  
    });
});

app.get('/weather', function(req, res){
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }
    const address = req.query.address;
    geocode(address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                res.send({
                    error: error
                })
            }

            res.send({
                location: location,
                forecast: forecastData
            })
        })
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('help404.hbs', {
        title: 'Help 404',
        name: 'Santiago Monleon',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Santiago Monleon',
        errorMessage: 'Page Not Found'
    });
});

app.listen(port, () => {
    console.log('Server has started on port ' + port);
});