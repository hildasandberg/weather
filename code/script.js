function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

let apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8d36c534427b2ed0d40545de60cd4706"

const getCity = (city) => {
  city = document.getElementById("cities").value

  if (city === "Stockholm") {
    apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8d36c534427b2ed0d40545de60cd4706"
    getWeather(apiUrl)
  } else if (city === "San Sebastian") {
    apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=San%20Sebastian,Spain&units=metric&APPID=8d36c534427b2ed0d40545de60cd4706"
    getWeather(apiUrl)
  } else if (city === "Las Vegas") {
    apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Las%20Vegas,US&units=metric&APPID=8d36c534427b2ed0d40545de60cd4706"
    getWeather(apiUrl)
  } else {
    exit()
  }
}

const getWeather = (apiUrl) => {
  fetch(apiUrl).then((response) => {
    return response.json()
  }).then((json) => {

    const stringWeather = JSON.stringify(json.weather[0])
    const parsedWeather = JSON.parse(stringWeather)

    document.getElementById('place').innerHTML = json.name
    document.getElementById('weather').innerHTML = parsedWeather.main
    document.getElementById('temperature').innerHTML = json.main.temp + " °C"
    document.getElementById('sunrise').innerHTML = "Sun will rise at " + msToTime(json.sys.sunrise)
    document.getElementById('sunset').innerHTML = "Sun will set at " +  msToTime(json.sys.sunset)
  })
}
