'use strict';


const weatherkey = '01dd76c234fd91af1d022bb5b85eb549';
const weatherSearchUrl = "https://api.openweathermap.org/data/2.5/weather";
const fUnit = "imperial";
const newsSearchURL = "https://newsapi.org/v2/top-headlines";
const newsAPIKey = 'd7ac7ad4b67b4f8fa9f9e08e2a0210ac';
const youtubeSearchURL = "https://www.googleapis.com/youtube/v3/search";
const youtubeAPIKey = 'AIzaSyC6S6t_GMyCosKYnK8ELbpOFDV6jCih5PM';


// scrolls to the top when clicked on the top left header in the navigation bar
$('#home').on('click', function (event){
  event.preventDefault()
  $('html, body').animate({
    scrollTop: 0,
  }, 'slow')
})
// scrolls to the weather section when the weather button link is clicked
$('#weatherNav').on('click', function(event){
  event.preventDefault()
  $('html, body').animate({
    scrollTop: $('#weatherResults').offset()
      .top,
  }, 'fast')

})

$('#wikiNav').on('click', function(event){
event.preventDefault()
$('html, body').animate({
  scrollTop: $('#wikiResults').offset()
    .top,
}, 'fast')
})

$('#newsNav').on('click', function(event){
event.preventDefault()
$('html, body').animate({
  scrollTop: $('#newsResults').offset()
    .top,
}, 'fast')
})

$('#videoNav').on('click', function(Event){
event.preventDefault()
$('html, body').animate({
    scrollTop: $('#youtubeResults').offset()
      .top,
}, 'fast')
})

//#2
// This function checks for a click on the start button. It displays and classes that have the hide class and they are overruled by the display block css
// Also hides the landing page elements. 
//enables the function to search for the country
function startTheSearch (){
  $('.startButton').on('click','.start', function(event){
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
    $('.hideNav').css('display','block');
    const countryId = $("#countryls option:selected").val();
    const countryName = $("#countryls option:selected").text();
    // console.log(countryId);
    // console.log(countryName);
    getTheWeather(countryId, countryName);
    getWikiResults(countryName);
    // searchHeadLines(countryName);
    // youtubeSeach(countryName);

  })
}

//This function fetched data from the Youtube API
function youtubeSeach (searchTerm){
  const params = {
    q: searchTerm,
    part: 'snippet',
    maxResults: '6',
    type: 'video',
    key: youtubeAPIKey,
  }

  const videoQuery = formatQueryParams(params);
  const videoURL = youtubeSearchURL + '?' + videoQuery;
  //console.log(videoURL);

  fetch(videoURL)
    .then(response => {
      if (response.ok){
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(videoResults => displayYoutubeResults(videoResults))
    .catch(error => {
      $("#you-error-message").text(`Something went wrong with this video: ${error.message}`);
    })
}
//This function displays and adds the data from the youtube API
  function displayYoutubeResults(videoResults){
    // console.log(videoResults)
    $('.youTubeResults').empty();
    for (let i = 0; i < videoResults.items.length; i++){
      $('.youTubeResults').append(
        `<section role="video results" id="youtubeResults" class="yResults" class="yTubeResultBox"><h3>${videoResults.items[i].snippet.title}</h3>
        <p>${videoResults.items[i].snippet.description}</p>
        <a target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=${videoResults.items[i].id.videoId}">
        <img class="videoImage" src='${videoResults.items[i] .snippet.thumbnails.high.url}' alt="Thumnail Image of ${videoResults.items[i].snippet.title}">
        </a><p id="you-error-message" class="error-message"></p></section>`
      
    )}
  };

//This function searches for headlines from the News API
function searchHeadLines (searchTerm){
  const params = {
    q: searchTerm, 
    language: "en",
    sortBy: "popularity", 
    apiKey: newsAPIKey,
  }
  
  console.log(searchTerm);
  const newsQueryString = formatQueryParams(params)
  console.log(newsQueryString);

  const url = newsSearchURL + '?' + newsQueryString;
  // console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText)
    })
    .then(responseJson => displayNewsResults(responseJson))
    .catch(error => {
      $('#news-error-message').text(`Something went wrong with the news: ${error.message} `);
    })
}


//This function displays the news data that was received from the API
function displayNewsResults (newsResults){
  // console.log(newsResults);
  // console.log(newsResults.articles[7]);
  //  let newsImage = `${newsResults.articles[i].urlToImage}`;
  // console.log(newsImage);
  $('#newsResults').empty();
  $('#newsResults').append(
    `<h1 style="text-align:center">News</h1>`
  )
  // console.log(newsResults.totalResults);
  if (newsResults.totalResults !== 0 ) {
  for(let i = 0; i < 6 ; i++){

    
    let newsImage = `${newsResults.articles[i].urlToImage}`;
    // console.log(newsImage);
    newsImageCheck(newsImage);
    
    //This function makes sure we get a link for the images in the articles if not it lets the user know that their is no image for that particular article
    function newsImageCheck(){
      if ((newsImage == null)||(newsImage == 'null') || (newsImage == undefined) || (newsImage == '')){
        $('#newsResults').append(
          `<li><p>(Sorry no image for this article)</p></li>`
        )
      }
      else {
        $('#newsResults').append(`<li><img style='height: 100%; width: 100%; object-fit: contain' class="newsImage" src='${newsResults.articles[i].urlToImage}'/></li>`)
      }
    }

    $('#newsResults').append(
      `<li><a href="${newsResults.articles[i].url}">
      ${newsResults.articles[i].title}</a><p>${newsResults.articles[i].source.name}</p>
      <p>By ${newsResults.articles[i].author}</p>
      <p class="newsD">${newsResults.articles[i].description}</p>
      </li><br>`
  )}  
  } else {
    $('#newsResults').append(
      `<p>Sorry looks like there's no news coverage coming up right now.</p>`
    )
  } 
}

//This function fetches information from wiki API
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
        // console.log(result);
        //console.log(result.query.pages[737].title);
        if (result.query.length != 0){
        let pageIDArray = Object.keys(result.query.pages);
            pageIDArray.forEach(pageID => showWikiResults(pageID, result.query.pages[pageID].title, result.query.pages[pageID].extract, result.query.pages[pageID].thumbnail));
          //  showWikiResults(result.query.pages); 
          // result.query.pages.map(showWikiResults);
            }
        else {
          $('#wiki-error-message').text('sorry, there was an error with wiki')
          }
      })
      /* if the call is NOT successful show errors */
      .fail(function(jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
        });
}


//This function displays the data from the wiki API
function showWikiResults(pageID, pageTitle, pageExtract, pageThumnail){
 //let dataThumnail = Object.keys(pageThumnail).map(key => ({key, value: pageThumnail[key]}));
 //console.log(dataThumnail[0].value);
//  console.log(pageThumnail.source)

  // console.log(pageTitle, pageExtract, pageThumnail);

    $('#wikiResults').empty();
    $('#wikiResults').append(
      `<h2>${pageTitle}</h2>
      <p id="wiki-error-message" class="error-message"></p>
      <p>${pageExtract}</p>
      <img id="wikiImage" src="${pageThumnail.source}" alt="image pertaining to"${pageTitle}>`      
    )
  }


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

  // console.log(params);
  const queryString = formatQueryParams(params);
  // console.log(queryString);
  const url = weatherSearchUrl+ '?' + queryString;
  // console.log(url);
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
    })
  .then(responseJson => displayWeatherResults(responseJson,     countryName))
  .catch(error => {
    $('#js-error-message').text(`Something went wrong: ${error.message}`);

    });
  $('.rhide').css('display', 'block');
}

// This function adds the data into the ID where the data will be represented and displayed. 
function displayWeatherResults(responseJson, countryName){  
  const weatherStatus = `${responseJson.weather[0].main}`;
  // backgroundImage(weatherStatus)

  weatherImg(weatherStatus);

  let capitalName = responseJson.name;
  // getWikiResults(capitalName);
  searchHeadLines(capitalName);
  youtubeSeach(capitalName); 

  // console.log(responseJson);
  $('#weatherResults').empty();
  //console.log(responseJson)
  weatherImg(weatherStatus);

  //This function checks the weather and displays a different icon depending on the weather status
  function weatherImg(status){
    // console.log(status);
    if (status == 'Clear'){
      $('#weatherResults').append(
        `<i class="far fa-sun"></i>`
      )
    
    } else if (status == 'Clouds'){
      $('#weatherResults').append(
        `<i class="fas fa-cloud"></i>`
      )
    } else if (status == 'Thunderstorm'){
      $('#weatherResults').append(
        `<i class="fas fa-cloud-showers-heavy"></i>`
      )
    } else if (status == 'Haze'){
      $('#weatherResults').append(
        `<i class="fas fa-smog"></i>`
      )
    } else if (status == 'Rain'){
      $('#weatherResults').append(
        `<i class="fas fa-cloud-rain"></i>`
      ) 
    } else if (status == 'Fog'){
      $('#weatherResults').append(
        `<i class="fas fa-smog"></i>`
      ) 
    } else {
      console.log(status);
    } 
  }
    $('#weatherResults').append(
      `<h2>The weather in ${responseJson.name} </h2>
      <p>How does the sky look? <br> ${responseJson.weather[0].main}</p>
      <li>${responseJson.main.temp} &#8457</li>`
    )
}
//#1
//function listens for the the restart button being pressed
function restartQuiz() {
  $('.restartBox').on('click', '.restartButton', function(event){
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
