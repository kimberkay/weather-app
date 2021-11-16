import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import checkZip from './business.js'

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    const zip = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=c3d5022af8f80bc473881d1c13ca7e64`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };


    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      const temp = Math.round(((1.8 * (response.main.temp - 273) + 32)*100)/100);
      const tempMin = Math.round(((1.8 * (response.main.temp_min - 273) + 32)*100)/100);
      const tempMax = Math.round(((1.8 * (response.main.temp_max - 273) + 32)*100)/100);
      try {
        const isNumberValid = checkZip(zip);
        if (isNumberValid instanceof Error) {
          throw RangeError("Not a valid Zip code!")
        } else {
          $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
          $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
          $(".showFahrenheit").text(`The temperature in Fahrenheit is ${temp} degrees`);
          $('.showConditions').text(`The current conditions are ${response.weather[0].main}.`);
          $(".showConditions").text(`The low for today is ${tempMin}, the high for today is ${tempMax}`);
        }
      } catch(error) {
        console.error(`Alert! We have an error ${error.message}`);
    }
  });

});