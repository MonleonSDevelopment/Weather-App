const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d6a3667a447c2030ac4cb1c5e3baede2/' + latitude + ',' + longitude;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined);
        }else if(body.error){
            callback('Unable to find location', undefined);
        }else{
            callback(undefined, {
                temperature: body.currently.temperature,
                precipProb: body.currently.precipProbability
            });
        }
    });
}

module.exports = forecast;