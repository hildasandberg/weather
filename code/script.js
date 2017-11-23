
//Make Stockholm default
let apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8d36c534427b2ed0d40545de60cd4706"

//Convert the sunset/sunrise time from seconds to hh:mm
const msToTime = (t) => {
  const e = new Date(1e3 * t)
  const n = e.getHours()
  const i = e.getMinutes();
  return (n < 10 ? "0" + n : n) + ":" + (i < 10 ? "0" + i : i) + " "
  }

//Sets the background depending on the temperature
const setBackgroundImg = (temp) => {
  document.getElementById("container").classList = ""
  if (temp <= 0) {
    document.getElementById("container").classList.toggle("supercold")
  } else if (temp >=1 && temp <= 17) {
    document.getElementById("container").classList.toggle("cold")
  } else if (temp >17 && temp <= 25) {
    document.getElementById("container").classList.toggle("warm")
  } else if (temp > 25) {
    document.getElementById("container").classList.toggle("hot")
  }
}

//Gets the city from the list and sets the api url
const getCity = (city) => {
  city = document.getElementById("cities").value
  if (city === "Stockholm") {
    apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8d36c534427b2ed0d40545de60cd4706"
    getWeather(apiUrl)
  } else if (city === "San Sebastian") {
    apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=San%20Sebastian,Spain&units=metric&APPID=8d36c534427b2ed0d40545de60cd4706"
    getWeather(apiUrl)
  } else if (city === "Phuket") {
    apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Phuket,Thailand&units=metric&APPID=8d36c534427b2ed0d40545de60cd4706"
    getWeather(apiUrl)
  } else {
    exit()
  }
}

//Get the wheater from openweather with the api
const getWeather = (apiUrl) => {
  fetch(apiUrl).then((response) => {
    return response.json()
  }).then((json) => {
    const stringWeather = JSON.stringify(json.weather[0])
    const parsedWeather = JSON.parse(stringWeather)
    //Prints values in html
    document.getElementById('place').innerHTML = json.name
    document.getElementById('weather').innerHTML = parsedWeather.main
    document.getElementById('temperature').innerHTML = json.main.temp + " °C"
    document.getElementById('sunrise').innerHTML = "Sun will rise at " + msToTime(json.sys.sunrise)
    document.getElementById('sunset').innerHTML = "Sun will set at " +  msToTime(json.sys.sunset)
    setBackgroundImg(parseFloat(json.main.temp))
  })
}

//To get the default city weather
getWeather(apiUrl)

//When changing city and pushing button then run code again
document.getElementById("knapp1").onclick = getCity
