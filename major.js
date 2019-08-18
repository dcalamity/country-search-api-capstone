  'use strict';


  const weatherkey = '01dd76c234fd91af1d022bb5b85eb549';
  const weatherSearchUrl = "https://api.openweathermap.org/data/2.5/weather";
  const fUnit = "imperial";
  const newsSearchURL = "https://newsapi.org/v2/top-headlines";
  const newsAPIKey = 'd7ac7ad4b67b4f8fa9f9e08e2a0210ac';

  //#2
  // This function checks for a click on the start button. It displays and classes that have the hide class and they are overruled by the display block css
  // Also hides the landing page elements. 
  //enables the function to search for the country
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
  //#5
  // This function formats the parameters and their keys so that they could be combined when requesting data. 
  function formatQueryParams(params){
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
    
  }
  //#3
  // This function is watching for a click on the search button
  // The event hides the search clock it saves the value of the selected element and creates a variable for the name and the value. 
  // The variables then get inputed into the paramenter for the get weather function. 
  function searchCountry (){
    $('.searchBlock').on('click', '.search',  function(event){
      // alert('search initiated')
      $('.searchBlock').hide();
      const countryId = $("#countryls option:selected").val();
      const countryName = $("#countryls option:selected").text();
      console.log(countryId);
      console.log(countryName);
      getTheWeather(countryId, countryName);
      getWikiResults(countryName);
    })
  }
  

  function getWikiResults (searchTerm){
    // encodeURIComponent() Function This function encodes special characters. In addition, it encodes the following characters: , / ? : @ & = + $ #
    // https://www.w3schools.com/jsref/jsref_encodeURIComponent.asp
     $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|extracts|pageterms&piprop=thumbnail&pithumbsize=1020&generator=search&plimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrlimit=1&callback=?&gsrsearch=" + encodeURIComponent(searchTerm),
            type: "GET",
            dataType: 'jsonp'
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function(result) {
            /* if the results are meeningful, we can just console.log them */
            console.log(result);
            //console.log(result.query.pages[737].title);
            if (result.query.length != 0){
              let pageIDArray = Object.keys(result.query.pages);
              pageIDArray.forEach(pageID => showWikiResults(pageID, result.query.pages[pageID].title, result.query.pages[pageID].extract, result.query.pages[pageID].thumbnail));
            //  showWikiResults(result.query.pages); 
            // result.query.pages.map(showWikiResults);
            }
            else {
              alert('no results');
            }
        })
        /* if the call is NOT successful show errors */
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
  }

  function showWikiResults(pageID, pageTitle, pageExtract, pageThumnail){
   //let dataThumnail = Object.keys(pageThumnail).map(key => ({key, value: pageThumnail[key]}));
   //console.log(dataThumnail[0].value);
   console.log(pageThumnail.source)

    console.log(pageTitle, pageExtract, pageThumnail);
      $('#wikiResults').empty();
      $('#wikiResults').append(
        `<h2>${pageTitle} </h2>
        <p>${pageExtract}</p>
        <img id="wikiImage" src="${pageThumnail.source}" alt="image pertaining to"${pageTitle}>`      
      )
  }
  //#4
  // This function fetches the the data. 
  // First we create and object with the parameters needed for the search. 
  //  Second we send those parameters to the format function
  // Third we combine the weather URL and the new formated query parameters
  // Fourth we check if the response is ok, if it is it returns the data into a Json formatt
  // Last but not least we push the data into another function that displays the data onto out DOM.

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
  
  // #6
  // This function adds the data into the ID where the data will be represented and displayed. 
  function displayWeatherResults(responseJson, countryName){
    $('#weatherResults').empty();
    console.log(responseJson)
      $('#weatherResults').append(

        `<h2>The weather in ${countryName} </h2>
        <p>How does the sky look? <br> ${responseJson.weather[0].main}</p>
        <li>${responseJson.main.temp} &#8457</li>`
      )
  }
  //#1
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