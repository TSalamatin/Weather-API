// var dayDate = $("#day-"+ index).find('.date').text()
// var dayTemp = $("#day-"+ index).find('.temperature').text()
// var dayWindspeed = $("#day-"+ index).find('.windspeed').text()
// var dayWindDegree = $("#day-"+ index).find('.winddegree').text()
// var dayHumidity =  $("#day-"+ index).find('.humidity').text()
var city
var cityID
var weekData = []

//Cakll the city Data 
function fetchCity(input) {

  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input + ',us&&appid=e498b6c6d940bacad67439963e87b103&units=imperial', {
  })

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

      var day = new Date(data.dt * 1000)

      $("#day-0").find('#city-name').text(data.name)
      $("#day-0").find('.date').text(day.toDateString())
      $("#day-0").find('.icon').attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
      $("#day-0").find('.temperature').text('Temperature: ' + data.main.temp + '°F')
      $("#day-0").find('.windspeed').text('Wind Speed: ' + data.wind.speed + ' MPH')
      $("#day-0").find('.winddegree').text('@ ' + data.wind.deg + '°')
      $("#day-0").find('.humidity').text('Humidity Percentage: ' + data.main.humidity + ' %')
      weekData.push(data)

      fetchForecast(data)
    })
}


//Get the Forecast for the city
function fetchForecast(citydata) {
  //The documentation says to call by lon/lat but that was 404 on me until I found an example that used ID.
  cityLon = citydata.coord.lon
  cityLat = citydata.coord.lat

  fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=e498b6c6d940bacad67439963e87b103&units=imperial', {
  })
    .then(function (response) {
      if (response.code == 404) {
        setNotFoundError(true)
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);

      for (let index = 0; index < data.list.length; index++) {
        if (index == 0 || index == 8 || index == 16 || index == 24 || index == 32) {
          var dayIdent = (index / 8 + 1)

          console.log('Temperature of Day ' + dayIdent + ' :' + data.list[index].main.temp);
          // Pull and set data
          $("#day-" + dayIdent).find('.date').text(data.list[index].dt_txt.slice(0, 10))
          $("#day-" + dayIdent).find('.icon').attr("src", "http://openweathermap.org/img/w/" + data.list[index].weather[0].icon + ".png")
          $("#day-" + dayIdent).find('.temperature').text('Temp: ' + data.list[index].main.temp + ' °F')
          $("#day-" + dayIdent).find('.windspeed').text('Wind: ' + data.list[index].wind.speed + ' MPH')
          $("#day-" + dayIdent).find('.winddegree').text('@ ' + data.list[index].wind.deg + '°')
          $("#day-" + dayIdent).find('.humidity').text('Humidity: ' + data.list[index].main.humidity + '%')





        }



      }

      console.log(weekData)

      storeCityData(data.city.name, weekData)
    })

}


//Create a button for the city
function createButton(input) {

  console.log(input)
  var btn = document.createElement("button")
  btn.innerHTML = input
  btn.id = input;
  btn.classList.add("btn-class");
  btn.type = "button";

  $('#button-container').append(btn)

}


//Store city Data
function storeCityData(keyname, data) {
  localStorage.setItem(keyname, JSON.stringify(data))
}


//Get City Data 
function getCityData(keyname) {
  var oldData = JSON.parse(localStorage.getItem(keyname))
  var day = new Date(oldData[0].dt * 1000)
  $("#day-0").find('#city-name').text(oldData[0].name)
  $("#day-0").find('.date').text(day.toDateString())
  $("#day-0").find('.icon').attr("src", "http://openweathermap.org/img/w/" + oldData[0].weather[0].icon + ".png")
  $("#day-0").find('.temperature').text('Temp: ' + oldData[0].main.temp + ' °F')
  $("#day-0").find('.windspeed').text('Wind: ' + oldData[0].wind.speed + ' MPH')
  $("#day-0").find('.winddegree').text('@ ' + oldData[0].wind.deg + '°')
  $("#day-0").find('.humidity').text('Humidity: ' + oldData[0].main.humidity + '%')

  for (let index = 1; index < oldData.length; index++) {
    $("#day-" + index).find('.date').text(oldData[index].dt_txt)
    $("#day-" + index).find('.icon').attr("src", "http://openweathermap.org/img/w/" + oldData[index].weather[0].icon + ".png")

    $("#day-" + index).find('.temperature').text('Temp: ' + oldData[index].main.temp)
    $("#day-" + index).find('.windspeed').text('Wind" ' + oldData[index].wind.speed)
    $("#day-" + index).find('.winddegree').text('@ ' + oldData[index].wind.deg)
    $("#day-" + index).find('.humidity').text('Humidity: ' + oldData[index].main.humidity)




  }

}


//Start the Search
$("#searchbtn").click(function () {
  var city = $("#city").val()
  console.log(city)
  weekData = []
  fetchCity(city)
  createButton(city)

})

//Add event listener
$('#button-container').on("click", 'button', function () {

  getCityData($(this).text())
});