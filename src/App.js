import React, { useState } from 'react';
const api = {
  key: "f170b83e8b538c6f08d04340b33fc0b8",
  base: "https://api.openweathermap.org/data/2.5/"
}

//// above api is an object, this API will be used to fetch weather data for the specified location


function App() {
  const [query, setQuery] = useState('');
  // query represents the user's input in the search bar and it is initialized as an empty string
  // weather is used to store the fetched weather data and initialized as an empty object
  const [weather, setWeather] = useState({});

  const search = evt => {
    ///The search function is responsible for fetching weather data from the OpenWeatherMap API when the user presses the Enter key after entering a city name in the search bar. 
    ///It uses the fetch function to make an API request, passing the query state variable (representing the city name) and the API key in the URL. The response is converted to JSON format using .json().

    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())  /// response is converted into .jsoon
        .then(result => {
          setWeather(result);  /// result is stored after fetching the data
          setQuery(''); /// it is to reset the query state to empty string
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;