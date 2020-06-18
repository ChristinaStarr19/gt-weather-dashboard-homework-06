$(document).ready(function(){
    var APIKey = "05bad4a2ac6a775269d6229bf4b336a9";
    var cityName;
    // var lat = "";
    // var lon = "";
    var queryURL;
    var queryURL2;
    var coords = [];


function getWeather(cityName){
    
    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURLCurrent,
        method: 'GET'
    })
    // Once the call is made, I want the following functions to happen
    .then(function(response){
    //Put all the information that I want to use to update the current weather here.
    console.log(response);
    var cityTitle = response.name;
    //To display city name and date.
    $(".currentCityName").text(response.name +" " + moment().format('l') );
    var iconPic = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconPic + ".png";
    //To display icon.
    $("#icon").attr("src", iconURL);
    //To display temperature.
    $("#temp").text("Temperature: " + response.main.temp);
    //To display humidity
    $("#humidity").text("Humidity: " + response.main.humidity);
    //To display windspeed
    $("#windSpeed").text("Windspeed: " + response.wind.speed);
    
    

    
    //Use this for the icons
    // var cityIconUrl = "http://openweathermap.org/img/w/" + iconEl + ".png";
    // $("#cityIconUrl").attr("src", cityIconUrl)



    var queryURL_UV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
    $.ajax({
        url: queryURL_UV,
        method: 'GET'
    })
    .then(function (response2){
    //Put all the informtion that I want to use to update the UV index here.
    console.log(response2);
    //To display uv Index 
    $("#uvIndex").text(response2.value);
    if (response2.value < 3){
        $("uvIndex").addClass("")
    }


    var queryURLForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURLForecast,
        method: 'GET'
    })
    .then (function (response3){
        console.log(response3);
    //Put all the information that I want to use to update the 5 day forecast here.
    //Use this for the icons :
    // var cityIconUrl = "http://openweathermap.org/img/w/" + iconEl + ".png";
    // $("#cityIconUrl").attr("src", cityIconUrl)




    })
    })
    }) 
}

//     function getUV(response){
//      //Let's see if the URL was created successfully.
//     console.log(response);
// //     coords.push({"lat": response.coord.lat});
//     coords.push({"lon":response.coord.lon});
//     // console.log(coords[0].lat);
//     var lat = response.coord.lat;
//     var lon = response.coord.lon;
     
     
// //     $(".list-group").append(" <li class='list-group-item'>"+ response.name + "</li>")
    
// //     // var lat = 

//     var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey +  "&lat=" +  latitude + "&lon=" + longitude;

//     $.ajax({
//         url: queryURL2,
//         method: 'GET'
//     }).then(getForecast) 
// }

//  function getForecast(response2){
//     console.log(coords[1].lon);
//     // var lon = response.coord.lon;
//     console.log(queryURL2);


//     //  $.ajax({

//     //  }).then(buildPage)

//  }
// function buildPage(response3){
//     //build the page
// }

// function savedhistory(cityName){
//     //store cityname in localstorage
// }

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