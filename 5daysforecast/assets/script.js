var ForecastOutput = (function() {

    var sntWeatObj; 
  
    return {
  
  
      addColorToDayDiv: function(sentSkyCondition) {
        var skyType = ["snow", "raining", "cloudy"]
  
        for (var i = 0; i < skyType.length; i++) {
          if (sentSkyCondition === skyType[i]){
            return "sky-color-gray";
          };
        };
        return "sky-color-blue"
      },
  
  
      addImageToDiv: function(sentSkyCondition) {
        var skyType = ["snow", "raining", "cloudy"]
        for (var i = 0; i < skyType.length; i++) {
          if (sentSkyCondition === skyType[i]){
            return skyType[i];
          };
        };
        return "Clear";
      },
  
  
      addWeatherToDivs: function() {
        for (var i = 0; i < sntWeatObj.list.length; i++) {
          var currentDayDiv = document.getElementById(`day-${i}`);
          var weatherString = `<p class="day-title">${ForecastOutput.timeToHuman(i)}</p>`;
          currentDayDiv.innerHTML += weatherString;
  
          
          var picTempConditionsDiv = document.createElement("div");
          picTempConditionsDiv.classList.add("img-temp-cond");
          currentDayDiv.appendChild(picTempConditionsDiv);
  
          
          var weatherImg = document.createElement("img");
          weatherImg.setAttribute("src", `img/${ForecastOutput.addImageToDiv(sntWeatObj.list[i].weather[0].main)}.png`);
          picTempConditionsDiv.appendChild(weatherImg);
  
         
          var dayTemp = ForecastOutput.tempToFahrenheit(sntWeatObj.list[i].temp.day);
          var nightTemp = ForecastOutput.tempToFahrenheit(sntWeatObj.list[i].temp.night);
          weatherString = `<div class="temps-weather"><p class="temps">Hi: ${dayTemp}&degF / Low: ${nightTemp}&degF</p>`;
          weatherString += `<p class="description">${ForecastOutput.formatSkyConditions(sntWeatObj.list[i].weather[0].description)}</p></div>`;
          picTempConditionsDiv.innerHTML += weatherString;
  
          
          currentDayDiv.classList.add(ForecastOutput.addColorToDayDiv(sntWeatObj.list[i].weather[0].main));
        };
      },
  
 
      formatSkyConditions: function(sentDetailedSkyCondition) {
        var capitalizedSkyConditions = sentDetailedSkyCondition.split(" ").map(function(arrayItem) {
          return (arrayItem.charAt(0).toUpperCase() + arrayItem.substring(1));
        }).join(" ");
        return capitalizedSkyConditions;
      },
  
  
      generalContentDisplay: function(sentParsedWeatherObject) {
  
        sntWeatObj = sentParsedWeatherObject;
  
      
        mainWeatherOutputDiv.innerHTML = `<p class=headline>Here's your ${sntWeatObj.cnt} day forecast for ${sntWeatObj.city.name}, ${sntWeatObj.city.country}</p>`;
  
        
        var dayBoxHolder = document.createElement("div");
        dayBoxHolder.id = "day-box-holder";
        dayBoxHolder.classList.add("day-box-holder");
        mainWeatherOutputDiv.appendChild(dayBoxHolder);
  
        
        for (var i = 0; i < sntWeatObj.list.length; i++) {
          var dayDiv = document.createElement("div");
          dayDiv.id = "day-" + i;
          dayDiv.classList.add("day-div");
          dayBoxHolder.appendChild(dayDiv);
        }
  
        
        ForecastOutput.addWeatherToDivs();
      },
  
  
      tempToFahrenheit: function(sentKelvinTemp) {
        var fahrenheitTemp = Math.round((sentKelvinTemp - 273.15) * 1.8 + 32);
        return fahrenheitTemp;
      },
      timeToHuman: function(sentCurrentDay) {
        var humanDate = new Date(sntWeatObj.list[sentCurrentDay].dt * 1000);
        var dateArray = humanDate.toGMTString().split(" ");
  
        var dayAbbrObject = 
          { 
            "Mon": "Monday",
            "Tue": "Tuesday",
            "Wed": "Wednesday",
            "Thu": "Thursday",
            "Fri": "Friday",
            "Sat": "Saturday",
            "Sun": "Sunday"
          };
        var tempDateAbriv = dateArray[0].substring(0, 3);
        for (day in dayAbbrObject) {
          if (day === tempDateAbriv) {
            dateArray[0] = dayAbbrObject[day];
          };
        };
        var monthDay = `${dateArray[0]}, ${dateArray[2]} ${dateArray[1]}`;
  
        return monthDay;
      }
    };
  
  })(ForecastOutput || {});
var zipInput = document.getElementById("zip-data");
var weatherForcast = document.getElementById("weather-forecast");
var buttonForcast = document.getElementById("submit-weather");

var DomInputs = (function() {

  return {

    checkZip: function() {
      if (/^[0-9]{5}$/.test(zipInput.value)) {
        zipInput.style.backgroundColor = "lightgreen";
        DomInputs.checkForecast();
      } else {
        zipInput.style.backgroundColor = "#B25148";
      };
    },

    checkForecast: function() {
      if (weatherForcast.value !== "") {
        WeatherInputs.XHRWeather(zipInput.value, weatherForcast.value);
      } else {
        alert("Please select a weather forecast");
      };
    }
  };

})( DomInputs || {});



zipInput.addEventListener("keypress", function() {
  if (event.code === "Enter") {
    DomInputs.checkZip();
  };
});

buttonForcast.addEventListener("click", DomInputs.checkZip);

var WeatherInputs = (function () {

    return {
  
      parseWeather: function() {
        var parsedWeatherObject = JSON.parse(this.responseText);
        ForecastOutput.generalContentDisplay(parsedWeatherObject);
      },
  
      XHRWeather: function(sentZipcode, sentForecastType) {
        var requestOpenWeather = new XMLHttpRequest();
        requestOpenWeather.addEventListener("load", WeatherInputs.parseWeather);
        requestOpenWeather.open("GET", `http://api.openweathermap.org/data/2.5/forecast/daily?zip=${sentZipcode},us&cnt=${sentForecastType}&APPID=b65ed22c41380f0f6c0e50fae7874970`);
        requestOpenWeather.send();
      }
    }
  })(WeatherInputs || {});
  var ForecastOutput = (function() {

    var mainWeatherOutputDiv = document.getElementById("main-weather-output");
    var sntWeatObj;
  
    return {
  
      addColorToDayDiv: function(sentSkyCondition) {
        var skyType = ["snow", "raining", "cloudy"]
  
        for (var i = 0; i < skyType.length; i++) {
          if (sentSkyCondition === skyType[i]){
            return "sky-color-gray";
          };
        };
        return "sky-color-blue"
      },
  
   
      addImageToDiv: function(sentSkyCondition) {
        var skyType = ["snow", "raining", "cloudy"]
        for (var i = 0; i < skyType.length; i++) {
          if (sentSkyCondition === skyType[i]){
            return skyType[i];
          };
        };
        return "Clear";
      },
  
      addWeatherToDivs: function() {
        for (var i = 0; i < sntWeatObj.list.length; i++) {
          var currentDayDiv = document.getElementById(`day-${i}`);
          var weatherString = `<p class="day-title">${ForecastOutput.timeToHuman(i)}</p>`;
          currentDayDiv.innerHTML += weatherString;
  
          var picTempConditionsDiv = document.createElement("div");
          picTempConditionsDiv.classList.add("img-temp-cond");
          currentDayDiv.appendChild(picTempConditionsDiv);
  
          var weatherImg = document.createElement("img");
          weatherImg.setAttribute("src", `img/${ForecastOutput.addImageToDiv(sntWeatObj.list[i].weather[0].main)}.png`);
          picTempConditionsDiv.appendChild(weatherImg);
  
          var dayTemp = ForecastOutput.tempToFahrenheit(sntWeatObj.list[i].temp.day);
          var nightTemp = ForecastOutput.tempToFahrenheit(sntWeatObj.list[i].temp.night);
          weatherString = `<div class="temps-weather"><p class="temps">Hi: ${dayTemp}&degF / Low: ${nightTemp}&degF</p>`;
          weatherString += `<p class="description">${ForecastOutput.formatSkyConditions(sntWeatObj.list[i].weather[0].description)}</p></div>`;
          picTempConditionsDiv.innerHTML += weatherString;
  
          currentDayDiv.classList.add(ForecastOutput.addColorToDayDiv(sntWeatObj.list[i].weather[0].main));
        };
      },
  
      formatSkyConditions: function(sentDetailedSkyCondition) {
        var capitalizedSkyConditions = sentDetailedSkyCondition.split(" ").map(function(arrayItem) {
          return (arrayItem.charAt(0).toUpperCase() + arrayItem.substring(1));
        }).join(" ");
        return capitalizedSkyConditions;
      },
  
      generalContentDisplay: function(sentParsedWeatherObject) {
  
        sntWeatObj = sentParsedWeatherObject;
  
        
        mainWeatherOutputDiv.innerHTML = `<p class=headline>Here's your ${sntWeatObj.cnt} day forecast for ${sntWeatObj.city.name}, ${sntWeatObj.city.country}</p>`;
  
       
        var dayBoxHolder = document.createElement("div");
        dayBoxHolder.id = "day-box-holder";
        dayBoxHolder.classList.add("day-box-holder");
        mainWeatherOutputDiv.appendChild(dayBoxHolder);
  
        for (var i = 0; i < sntWeatObj.list.length; i++) {
          var dayDiv = document.createElement("div");
          dayDiv.id = "day-" + i;
          dayDiv.classList.add("day-div");
          dayBoxHolder.appendChild(dayDiv);
        }
  
        ForecastOutput.addWeatherToDivs();
      },
      tempToFahrenheit: function(sentKelvinTemp) {
        var fahrenheitTemp = Math.round((sentKelvinTemp - 273.15) * 1.8 + 32);
        return fahrenheitTemp;
      },
  
      timeToHuman: function(sentCurrentDay) {
        var humanDate = new Date(sntWeatObj.list[sentCurrentDay].dt * 1000);
        var dateArray = humanDate.toGMTString().split(" ");
  
        var dayAbbrObject = 
          { 
            "Mon": "Monday",
            "Tue": "Tuesday",
            "Wed": "Wednesday",
            "Thu": "Thursday",
            "Fri": "Friday",
            "Sat": "Saturday",
            "Sun": "Sunday"
          };
  
        var tempDateAbriv = dateArray[0].substring(0, 3);
        for (day in dayAbbrObject) {
          if (day === tempDateAbriv) {
            dateArray[0] = dayAbbrObject[day];
          };
        };
        var monthDay = `${dateArray[0]}, ${dateArray[2]} ${dateArray[1]}`;
  
        return monthDay;
      }
    };
  
  })(ForecastOutput || {});