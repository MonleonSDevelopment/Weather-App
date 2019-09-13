console.log("Client side javascript file is loaded");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = "Loading...";

    const location = search.value;
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = error;
        }else{
            messageOne.textContent = "Location: " + data.location;
            messageTwo.textContent = "Tempurature: " + data.forecast.temperature + "\n Chance of Precipitation: " + data.forecast.precipProb;
        }
    })
});
});