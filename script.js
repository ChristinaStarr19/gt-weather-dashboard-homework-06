$(document).ready(function () {
  var APIKey = "05bad4a2ac6a775269d6229bf4b336a9";
  var cityName;
  // var lat = "";
  // var lon = "";
  var queryURL;
  var queryURL2;
  var coords = [];

  function getWeather(cityName) {
    var queryURLCurrent =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=imperial&appid=" +
      APIKey;
    $.ajax({
      url: queryURLCurrent,
      method: "GET",
    })
      // Once the call is made, I want the following functions to happen
      .then(function (response) {
        //Put all the information that I want to use to update the current weather here.
        var cityTitle = response.name;
        //To display city name and date.
        $(".currentCityName").text(response.name + " " + moment().format("l"));
        var iconPic = response.weather[0].icon;
        var iconURL = "https://openweathermap.org/img/w/" + iconPic + ".png";
        //To display icon.
        $("#icon").attr("src", iconURL);
        //To display temperature.
        $("#temp").text("Temperature: " + response.main.temp + " °F");
        //To display humidity
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        //To display windspeed
        $("#windSpeed").text("Windspeed: " + response.wind.speed + " MPH");

        
        var queryURL_UV =
          "https://api.openweathermap.org/data/2.5/uvi?appid=" +
          APIKey +
          "&lat=" +
          response.coord.lat +
          "&lon=" +
          response.coord.lon;
        $.ajax({
          url: queryURL_UV,
          method: "GET",
        }).then(function (response2) {
          //Put all the informtion that I want to use to update the UV index here.
          console.log(response2);
          //To display uv Index
          $("#uvIndex").text("UV Index: " + response2.value);
          var uvIndex = response2.value;
          if (uvIndex < 3) {
            $("uvIndex").addClass(".green");
          } else if (uvIndex < 7 && response2.value > 3) {
            $("uvIndex").addClass(".orange");
          } else {
            $("uvIndex").addClass(".red");
          }

          var queryURLForecast =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            cityName +
            "&units=imperial&appid=" +
            APIKey;
          $.ajax({
            url: queryURLForecast,
            method: "GET",
          }).then(function (response3) {
            console.log(response3);

            //Put all the information that I want to use to update the 5 day forecast here.

            //Use this for the icons :
            // var cityIconUrl = "http://openweathermap.org/img/w/" + iconEl + ".png";
            // $("#cityIconUrl").attr("src", cityIconUrl)

            $("#day1").text(moment().add(1, "days").format("l"));
            $("#day2").text(moment().add(2, "days").format("l"));
            $("#day3").text(moment().add(3, "days").format("l"));
            $("#day4").text(moment().add(4, "days").format("l"));
            $("#day5").text(moment().add(5, "days").format("l"));

            var icon1 = response3.list[0].weather[0].icon;
            var cityIconUrl1 =
              "https://openweathermap.org/img/w/" + icon1 + ".png";
            $("#icon1").attr("src", cityIconUrl1);
            var icon2 = response3.list[1].weather[0].icon;
            var cityIconUrl2 =
              "https://openweathermap.org/img/w/" + icon2 + ".png";
            $("#icon2").attr("src", cityIconUrl2);
            var icon3 = response3.list[2].weather[0].icon;
            var cityIconUrl3 =
              "https://openweathermap.org/img/w/" + icon3 + ".png";
            $("#icon3").attr("src", cityIconUrl3);
            var icon4 = response3.list[3].weather[0].icon;
            var cityIconUrl4 =
              "https://openweathermap.org/img/w/" + icon4 + ".png";
            $("#icon4").attr("src", cityIconUrl4);
            var icon5 = response3.list[4].weather[0].icon;
            var cityIconUrl5 =
              "https://openweathermap.org/img/w/" + icon5 + ".png";
            $("#icon5").attr("src", cityIconUrl5);

            $("#temp1").text("Temp: " + response3.list[0].main.temp + " °F");
            $("#temp2").text("Temp: " + response3.list[1].main.temp + " °F");
            $("#temp3").text("Temp: " + response3.list[2].main.temp + " °F");
            $("#temp4").text("Temp: " + response3.list[3].main.temp + " °F");
            $("#temp5").text("Temp: " + response3.list[4].main.temp + " °F");

            $("#humidity1").text(
              "Humidity: " + response3.list[0].main.humidity + "%"
            );
            $("#humidity2").text(
              "Humidity: " + response3.list[1].main.humidity + "%"
            );
            $("#humidity3").text(
              "Humidity: " + response3.list[2].main.humidity + "%"
            );
            $("#humidity4").text(
              "Humidity: " + response3.list[3].main.humidity + "%"
            );
            $("#humidity5").text(
              "Humidity: " + response3.list[4].main.humidity + "%"
            );
        
        
            //Save the latest city to local storage
            var cityName = $("#city-name").val();
            console.log(cityName);
            localStorage.setItem("city", cityName);
          });
        });
      });
  }


  function handleSubmit(event) {
    event.preventDefault();
    var cityName = $("#city-name").val().trim();
    //call save history
    $(".list-group").prepend(
      " <li class='list-group-item'>" + localStorage.getItem("city") + "</li>"
    );

    getWeather(cityName);
  }

  $("#add-city").on("click", handleSubmit);

});
