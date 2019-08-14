'use strict';


const weatherkey = '01dd76c234fd91af1d022bb5b85eb549';
const weatherSearchUrl = "https://api.openweathermap.org/data/2.5/weather";

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
      $('.rhide').css('display', 'block');
      const countryId = $("#countryls option:selected").val();
      const countryName = $("#countryls option:selected").text();
      console.log(countryId);
      console.log(countryName);
      getTheWeather(countryId)
    })
    
  }

  function getTheWeather(countryId) {
    const params = {
      id: countryId,
      APPID: weatherkey,

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
    .then(responseJson => displayWeatherResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
  }

  
  function displayWeatherResults (responseJson){

  }


  function start (){
    $(startTheSearch)
  }

  $(start);