$(document).ready(function(){
    var APIKey = "05bad4a2ac6a775269d6229bf4b336a9";
    var cityName;
// This is how I plan to build the url dynamically.
//var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;


function getWeather(cityName){
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=05bad4a2ac6a775269d6229bf4b336a9";
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    // Once the call is made, I want the following functions to happen
    .then(getUV) 
}

function getUV(response){
    //Let's see if the URL was created successfully.
    console.log(queryURL);
    console.log(response);
    $(".list-group").append(" <li class='list-group-item'>"+ response.name + "</li>")
    

    $.ajax({}).then(getForecast)
}

function getForecast(response2){
    $.ajax({}).then(buildPage)

}
function buildPage(response3){
    //build the page
}

function savedhistory(cityName){
    //store cityname in localstorage
}

function handleSubmit(event){
    event.preventDefault();
    var cityName = $("#city-name").val().trim();
    //call save history
    getWeather(cityName)
}

$("#add-city").on("click", handleSubmit );


// This is where I'll run the AJAX call to the API

// read list from local storage
// if not empty
//   populate list on the left
//   take last city and call getWeather()

});