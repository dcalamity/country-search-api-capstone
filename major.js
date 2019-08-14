'use strict';


const weatherkey = '01dd76c234fd91af1d022bb5b85eb549';
const weatherSearchUrl = "https://api.openweathermap.org/data/2.5/weather";

const fUnit = "imperial";

  function startTheSearch (){
    $('.start').on('click','.startbutton', function(event){
      //alert('start button pressed');
      $('.hide').css('display','block');
      $('.info').hide();
      $('.apinfo').hide();
      $('.start').hide();
      $(searchCountry);
    })

  };

  function formatQueryParams(params){
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
    
  }

  function searchCountry (){
    $('.searchBlock').on('click', '.search',  function(event){
      // alert('search initiated')
      $('.searchBlock').hide();
      const countryId = $("#countryls option:selected").val();
      const countryName = $("#countryls option:selected").text();
      console.log(countryId);
      console.log(countryName);
      getTheWeather(countryId, countryName)
      
    })
    
  }

  function getTheWeather(countryId, countryName) {
    const params = {
      id: countryId,
      APPID: weatherkey,
      units: fUnit,
    }

    console.log(params);
    const queryString = formatQueryParams(params);
    console.log(queryString);
    const url = weatherSearchUrl+ '?' + queryString;
    console.log(url);
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayWeatherResults(responseJson, countryName))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);

    });
    $('.rhide').css('display', 'block');
  }
  //instead received the temp in the format we wanted from API
  // function converstion (temp){
  //   let fahtValue = 9 / 5 * (temp - 273) + 32;
  //   let round = Math.round(fahtValue);
  //   console.log(round)
  //   return round;
  // }
  
  function displayWeatherResults(responseJson, countryName){
    $('#weatherResults').empty();
    console.log(responseJson)
      $('#weatherResults').append(

        `<h2>The weather in ${countryName} </h2>
        <p>How does the sky look? <br> ${responseJson.weather[0].main}</p>
        <li>${responseJson.main.temp} &#8457</li>`
      )
  }

  //function listens for the the restart button being pressed
function restartQuiz() {
  $('.restartBox').on('click', '.restart', function(event){
      event.preventDefault()
      console.log('clicked on restart button')
      window.location.reload();
  }
)}


  function start (){
    $(startTheSearch)
    $(restartQuiz)
  }

  $(start);